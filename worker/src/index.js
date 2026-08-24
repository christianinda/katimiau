function corsHeaders(env, origin){
  const allowed = origin === env.ALLOWED_ORIGIN ? origin : '';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

async function sha256Hex(text){
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env, ctx){
    const origin = request.headers.get('Origin') || '';

    if(request.method === 'OPTIONS'){
      return new Response(null, { status: 204, headers: corsHeaders(env, origin) });
    }

    if(origin !== env.ALLOWED_ORIGIN){
      return new Response(JSON.stringify({ error: 'origin_not_allowed' }), {
        status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }

    const url = new URL(request.url);
    if(request.method !== 'POST' || url.pathname !== '/tts'){
      return new Response(JSON.stringify({ error: 'not_found' }), {
        status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }

    let body;
    try{
      body = await request.json();
    }catch(e){
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }

    const text = String(body.text || '').trim();
    const lang = body.lang === 'en' ? 'en' : 'es';
    const maxLen = parseInt(env.MAX_TEXT_LENGTH, 10) || 600;

    if(!text){
      return new Response(JSON.stringify({ error: 'missing_text' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }
    if(text.length > maxLen){
      return new Response(JSON.stringify({ error: 'text_too_long', max: maxLen }), {
        status: 413, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const hourBucket = Math.floor(Date.now() / 3600000);
    const rlKey = `rl:${ip}:${hourBucket}`;
    const limit = parseInt(env.RATE_LIMIT_PER_HOUR, 10) || 15;
    const currentRaw = await env.RATE_LIMIT.get(rlKey);
    const current = currentRaw ? parseInt(currentRaw, 10) : 0;
    if(current >= limit){
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }

    const voiceId = lang === 'en' ? env.VOICE_ID_EN : env.VOICE_ID_ES;
    const cacheKeyRaw = `v2:${voiceId}:${lang}:${text}`;
    const cacheHash = await sha256Hex(cacheKeyRaw);
    const cacheUrl = `https://katimiau-tts-cache.internal/${cacheHash}`;
    const cache = caches.default;
    let cached = await cache.match(cacheUrl);
    if(cached){
      const resp = new Response(cached.body, cached);
      Object.entries(corsHeaders(env, origin)).forEach(([k,v]) => resp.headers.set(k, v));
      return resp;
    }

    await env.RATE_LIMIT.put(rlKey, String(current + 1), { expirationTtl: 3600 });

    const elResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: env.MODEL_ID || 'eleven_multilingual_v2',
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true, speed: 0.85 }
      })
    });

    if(!elResponse.ok){
      const errText = await elResponse.text();
      return new Response(JSON.stringify({ error: 'tts_upstream_error', detail: errText.slice(0, 300) }), {
        status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders(env, origin) }
      });
    }

    const audioBuffer = await elResponse.arrayBuffer();
    const responseHeaders = {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=2592000',
      ...corsHeaders(env, origin)
    };
    const finalResponse = new Response(audioBuffer, { status: 200, headers: responseHeaders });
    ctx.waitUntil(cache.put(cacheUrl, finalResponse.clone()));
    return finalResponse;
  }
};
