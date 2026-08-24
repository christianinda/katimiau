const KatiAudio = (function(){
  let ctx = null;

  function getCtx(){
    if(!ctx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if(AC) ctx = new AC();
    }
    if(ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function unlock(){ getCtx(); }

  function tone(freq, start, dur, { type = 'sine', peak = 0.18, glideTo = null } = {}){
    const c = getCtx();
    if(!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + start);
    if(glideTo){
      osc.frequency.linearRampToValueAtTime(glideTo, c.currentTime + start + dur);
    }
    gain.gain.setValueAtTime(0, c.currentTime + start);
    gain.gain.linearRampToValueAtTime(peak, c.currentTime + start + Math.min(0.02, dur/3));
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.02);
  }

  function noiseBurst(start, dur, { peak = 0.12, lowpass = 3500, highpass = 200 } = {}){
    const c = getCtx();
    if(!c) return;
    const bufferSize = Math.floor(c.sampleRate * dur);
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buffer;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = lowpass;
    const hp = c.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = highpass;
    const gain = c.createGain();
    gain.gain.setValueAtTime(0, c.currentTime + start);
    gain.gain.linearRampToValueAtTime(peak, c.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    src.connect(hp); hp.connect(lp); lp.connect(gain); gain.connect(c.destination);
    src.start(c.currentTime + start);
    src.stop(c.currentTime + start + dur + 0.02);
  }

  const sfx = {
    pee(){
      for(let i=0;i<6;i++) noiseBurst(i*0.09, 0.08, { peak:0.08, lowpass:6000, highpass:1500 });
    },
    poop(){
      tone(220, 0, 0.18, { type:'sine', peak:0.22, glideTo:90 });
      tone(90, 0.16, 0.12, { type:'triangle', peak:0.15 });
    },
    bath(){
      [0,0.12,0.24,0.36,0.48].forEach((t,i)=>{
        tone(500 + i*90, t, 0.14, { type:'sine', peak:0.12, glideTo:700 + i*90 });
      });
      noiseBurst(0, 0.5, { peak:0.05, lowpass:5000, highpass:800 });
    },
    teeth(){
      for(let i=0;i<8;i++) noiseBurst(i*0.09, 0.06, { peak:0.09, lowpass:8000, highpass:3000 });
    },
    chew(){
      tone(180, 0, 0.09, { type:'square', peak:0.1, glideTo:260 });
      tone(150, 0.11, 0.08, { type:'square', peak:0.09, glideTo:220 });
    },
    drink(){
      [0,0.1,0.2,0.3].forEach((t,i)=>{
        tone(320 - i*40, t, 0.12, { type:'sine', peak:0.14, glideTo:260 - i*40 });
      });
    },
    dress(){
      [660, 880, 1100, 1320].forEach((f,i)=> tone(f, i*0.07, 0.14, { type:'triangle', peak:0.13 }));
    },
    paint(){
      noiseBurst(0, 0.16, { peak:0.06, lowpass:2600, highpass:500 });
    },
    heart(){
      tone(880, 0, 0.1, { type:'sine', peak:0.12, glideTo:1100 });
    }
  };

  let ambientNodes = null;
  function startAmbient(){
    const c = getCtx();
    if(!c || ambientNodes) return;
    const master = c.createGain();
    master.gain.setValueAtTime(0, c.currentTime);
    master.gain.linearRampToValueAtTime(0.05, c.currentTime + 1.5);
    master.connect(c.destination);

    const oscA = c.createOscillator();
    oscA.type = 'sine'; oscA.frequency.value = 196;
    const oscB = c.createOscillator();
    oscB.type = 'sine'; oscB.frequency.value = 246.94;
    const lfo = c.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 0.12;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);

    oscA.connect(master); oscB.connect(master);
    oscA.start(); oscB.start(); lfo.start();
    ambientNodes = { master, oscA, oscB, lfo };
  }
  function stopAmbient(){
    if(!ambientNodes) return;
    const c = getCtx();
    const { master, oscA, oscB, lfo } = ambientNodes;
    master.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
    setTimeout(()=>{
      try{ oscA.stop(); oscB.stop(); lfo.stop(); }catch(e){}
    }, 700);
    ambientNodes = null;
  }

  let voices = [];
  function loadVoices(){ voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : []; }
  if(window.speechSynthesis){
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function pickVoice(lang){
    const prefix = lang === 'en' ? 'en' : 'es';
    const candidates = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    const female = candidates.find(v => /female|mujer|femenin|samantha|monica|paulina|helena|zira/i.test(v.name));
    return female || candidates[0] || null;
  }

  function speakBrowser(text, lang){
    if(!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'en' ? 'en-US' : 'es-ES';
    utter.pitch = 1.3;
    utter.rate = 0.92;
    const v = pickVoice(lang);
    if(v) utter.voice = v;
    window.speechSynthesis.speak(utter);
  }

  const VOICE_API_URL = 'https://katimiau-voice.christianinda.workers.dev/tts';
  let currentAudio = null;

  async function speak(text, lang, { onEnd } = {}){
    stopSpeak();
    try{
      const resp = await fetch(VOICE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang })
      });
      if(!resp.ok) throw new Error('voice_api_error_' + resp.status);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudio = audio;
      audio.addEventListener('ended', () => { URL.revokeObjectURL(url); if(onEnd) onEnd(); });
      audio.addEventListener('error', () => { URL.revokeObjectURL(url); speakBrowser(text, lang); if(onEnd) onEnd(); });
      await audio.play();
    }catch(e){
      speakBrowser(text, lang);
      if(onEnd) setTimeout(onEnd, Math.max(2000, text.length * 60));
    }
  }

  function stopSpeak(){
    if(currentAudio){ currentAudio.pause(); currentAudio = null; }
    if(window.speechSynthesis) window.speechSynthesis.cancel();
  }

  return { unlock, sfx, startAmbient, stopAmbient, speak, stopSpeak };
})();
