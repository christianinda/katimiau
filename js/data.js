const CAT_OPTIONS = [
  { id:'black', nameKey:'cats.black' },
  { id:'white', nameKey:'cats.white' },
  { id:'brown', nameKey:'cats.brown' }
];

const BATHROOM_ACTIONS = [
  { id:'pee',   labelKey:'bathroom.pee',   emoji:'💦', fx:'💦', sfx:'pee' },
  { id:'poop',  labelKey:'bathroom.poop',  emoji:'💩', fx:'💩', sfx:'poop' },
  { id:'bath',  labelKey:'bathroom.bath',  emoji:'🛁', fx:'🫧', sfx:'bath' },
  { id:'teeth', labelKey:'bathroom.teeth', emoji:'🪥', fx:'✨', sfx:'teeth' }
];

const BATHROOM_REACTIONS = {
  es: ['¡Já, cosquillas!', '¡Uy, qué rico!', '¡Miau, gracias!', '¡Eso se sintió genial!', '¡Quedé brillante!'],
  en: ['Hehe, tickles!', 'Ooh, so nice!', 'Meow, thank you!', 'That felt great!', 'I feel shiny now!']
};

const KITCHEN_FOOD = [
  { id:'tuna',  labelKey:'food.tuna',  emoji:'🐟' },
  { id:'egg',   labelKey:'food.egg',   emoji:'🥚' },
  { id:'salad', labelKey:'food.salad', emoji:'🥗' }
];

const KITCHEN_DRINK = [
  { id:'water', labelKey:'drink.water', emoji:'💧' },
  { id:'milk',  labelKey:'drink.milk',  emoji:'🥛' }
];

const OUTFIT_CLOTHING = [
  { id:'none',     labelKey:'outfit.none' },
  { id:'dress',    labelKey:'outfit.dress' },
  { id:'overalls', labelKey:'outfit.overalls' },
  { id:'tshirt',   labelKey:'outfit.tshirt' },
  { id:'tutu',     labelKey:'outfit.tutu' },
  { id:'cape',     labelKey:'outfit.cape' },
  { id:'pajama',   labelKey:'outfit.pajama' }
];

const OUTFIT_SHOES = [
  { id:'none',        labelKey:'outfit.shoesNone' },
  { id:'shoesRed',    labelKey:'outfit.shoesRed' },
  { id:'shoesYellow', labelKey:'outfit.shoesYellow' },
  { id:'shoesBlue',   labelKey:'outfit.shoesBlue' }
];

const STORIES = [
  { id:'bee',      emoji:'🐝', titleKey:'story.bee.title',      textKey:'story.bee.text' },
  { id:'frog',     emoji:'🐸', titleKey:'story.frog.title',     textKey:'story.frog.text' },
  { id:'unicorn',  emoji:'🦄', titleKey:'story.unicorn.title',  textKey:'story.unicorn.text' },
  { id:'moon',     emoji:'🌙', titleKey:'story.moon.title',     textKey:'story.moon.text' },
  { id:'fish',     emoji:'🐠', titleKey:'story.fish.title',     textKey:'story.fish.text' },
  { id:'bear',     emoji:'🧸', titleKey:'story.bear.title',     textKey:'story.bear.text' }
];

const RANDOM_STORY_PARTS = {
  es: {
    heroes: ['un gatito curioso', 'una ranita saltarina', 'un conejito soñador', 'una tortuguita paciente', 'un pajarito cantor'],
    places: ['un jardín de flores gigantes', 'una montaña de algodón de azúcar', 'un río de estrellas', 'un bosque que brillaba de noche', 'una isla flotante entre las nubes'],
    items: ['una piedrita mágica', 'una pluma dorada', 'una campanita de cristal', 'un farolito de luciérnagas', 'una hoja que cantaba bajito'],
    endings: ['se acurrucó feliz y se quedó profundamente dormido', 'bostezó despacito y cerró los ojitos con una sonrisa', 'se abrazó a su tesoro y soñó cosas hermosas', 'sintió que todo estaba bien y se durmió tranquilo']
  },
  en: {
    heroes: ['a curious kitten', 'a hoppy little frog', 'a dreamy bunny', 'a patient little turtle', 'a singing little bird'],
    places: ['a garden of giant flowers', 'a mountain made of cotton candy', 'a river of stars', 'a forest that glowed at night', 'a floating island among the clouds'],
    items: ['a tiny magic pebble', 'a golden feather', 'a little crystal bell', 'a firefly lantern', 'a leaf that hummed softly'],
    endings: ['curled up happily and fell fast asleep', 'yawned slowly and closed its little eyes with a smile', 'hugged its treasure close and dreamed beautiful dreams', 'felt that everything was just right and drifted off to sleep']
  }
};

function pickRandom(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function generateRandomStory(lang){
  const p = RANDOM_STORY_PARTS[lang] || RANDOM_STORY_PARTS.es;
  const hero = pickRandom(p.heroes);
  const place = pickRandom(p.places);
  const item = pickRandom(p.items);
  const ending = pickRandom(p.endings);
  if(lang === 'en'){
    return {
      title: 'A Surprise Tale',
      text: `Once upon a time, there was ${hero} who lived in ${place}. One day it found ${item}, and as the sky turned soft and pink, it felt so calm and safe that it ${ending}.`
    };
  }
  return {
    title: 'Un cuento sorpresa',
    text: `Había una vez ${hero} que vivía en ${place}. Un día encontró ${item}, y cuando el cielo se puso rosadito y suave, sintió tanta calma y tanta seguridad que ${ending}.`
  };
}

const OUTFIT_CLOTHING_COLORS = {
  none: null,
  dress: '#ff9ec7',
  overalls: '#c9b6ff',
  tshirt: '#9ee9d4',
  tutu: '#ffd166',
  cape: '#ff6b6b',
  pajama: '#8ec9ff'
};

const OUTFIT_SHOE_COLORS = {
  none: null,
  shoesRed: '#ff6b6b',
  shoesYellow: '#ffd166',
  shoesBlue: '#5aa9ff'
};

const ART_PALETTE = ['#ff6fae','#ffd166','#9ee9d4','#8ec9ff','#c9b6ff','#ff9e6d','#6ac47c','#4a4a52','#ffffff'];

const ART_TEMPLATES = {
  flower: {
    emoji:'🌸',
    defaultFills:{ center:'#ffd166', p1:'#ffffff', p2:'#ffffff', p3:'#ffffff', p4:'#ffffff', p5:'#ffffff', stem:'#6ac47c', leaf:'#6ac47c' },
    svg: `
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="120" x2="100" y2="200" stroke="#6ac47c" stroke-width="10" data-fillable data-part="stem"/>
      <path d="M100 165 Q70 165 60 190 Q90 190 100 165" data-fillable data-part="leaf"/>
      <g data-fillable data-part="p1"><ellipse cx="100" cy="65" rx="22" ry="32"/></g>
      <g data-fillable data-part="p2" transform="rotate(72 100 100)"><ellipse cx="100" cy="65" rx="22" ry="32"/></g>
      <g data-fillable data-part="p3" transform="rotate(144 100 100)"><ellipse cx="100" cy="65" rx="22" ry="32"/></g>
      <g data-fillable data-part="p4" transform="rotate(216 100 100)"><ellipse cx="100" cy="65" rx="22" ry="32"/></g>
      <g data-fillable data-part="p5" transform="rotate(288 100 100)"><ellipse cx="100" cy="65" rx="22" ry="32"/></g>
      <circle cx="100" cy="100" r="20" data-fillable data-part="center"/>
    </svg>`
  },
  cat: {
    emoji:'🐱',
    defaultFills:{ head:'#ffffff', earL:'#ffffff', earR:'#ffffff', cheekL:'#ffc9de', cheekR:'#ffc9de', nose:'#ff9ec7' },
    svg: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M55 60 L35 15 L85 50 Z" data-fillable data-part="earL"/>
      <path d="M145 60 L165 15 L115 50 Z" data-fillable data-part="earR"/>
      <circle cx="100" cy="105" r="60" data-fillable data-part="head"/>
      <circle cx="72" cy="120" r="12" data-fillable data-part="cheekL"/>
      <circle cx="128" cy="120" r="12" data-fillable data-part="cheekR"/>
      <circle cx="82" cy="100" r="6" fill="#3b3040"/>
      <circle cx="118" cy="100" r="6" fill="#3b3040"/>
      <path d="M94 112 Q100 118 106 112 Q102 120 94 112" data-fillable data-part="nose"/>
      <path d="M30 118 L2 112 M30 124 L0 124 M170 118 L198 112 M170 124 L200 124" stroke="#c9bfae" stroke-width="2.5" fill="none"/>
    </svg>`
  },
  sun: {
    emoji:'☀️',
    defaultFills:{ center:'#ffd166', rays:'#ffe1a1' },
    svg: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g data-fillable data-part="rays">
        <path d="M100 10 L108 40 L92 40 Z"/>
        <path d="M100 190 L108 160 L92 160 Z"/>
        <path d="M10 100 L40 92 L40 108 Z"/>
        <path d="M190 100 L160 92 L160 108 Z"/>
        <path d="M35 35 L58 50 L50 58 Z"/>
        <path d="M165 165 L142 150 L150 142 Z"/>
        <path d="M35 165 L58 150 L50 142 Z"/>
        <path d="M165 35 L142 50 L150 58 Z"/>
      </g>
      <circle cx="100" cy="100" r="48" data-fillable data-part="center"/>
      <circle cx="85" cy="95" r="5" fill="#3b3040"/>
      <circle cx="115" cy="95" r="5" fill="#3b3040"/>
      <path d="M82 112 Q100 126 118 112" stroke="#3b3040" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  heart: {
    emoji:'💖',
    defaultFills:{ heart:'#ffffff', starA:'#ffffff', starB:'#ffffff' },
    svg: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 175 C 30 125, 20 70, 60 45 C 85 30, 100 55, 100 65 C 100 55, 115 30, 140 45 C 180 70, 170 125, 100 175 Z" data-fillable data-part="heart"/>
      <path d="M35 40 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" data-fillable data-part="starA"/>
      <path d="M165 55 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" data-fillable data-part="starB"/>
    </svg>`
  },
  butterfly: {
    emoji:'🦋',
    defaultFills:{ wingTL:'#ffffff', wingTR:'#ffffff', wingBL:'#ffffff', wingBR:'#ffffff', body:'#4a4a52' },
    svg: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M98 40 C60 20 20 40 25 80 C28 105 60 105 98 90 Z" data-fillable data-part="wingTL"/>
      <path d="M102 40 C140 20 180 40 175 80 C172 105 140 105 102 90 Z" data-fillable data-part="wingTR"/>
      <path d="M98 95 C68 100 35 115 40 145 C43 165 68 165 98 140 Z" data-fillable data-part="wingBL"/>
      <path d="M102 95 C132 100 165 115 160 145 C157 165 132 165 102 140 Z" data-fillable data-part="wingBR"/>
      <rect x="94" y="35" width="12" height="120" rx="6" data-fillable data-part="body"/>
      <path d="M96 38 Q80 20 68 24 M104 38 Q120 20 132 24" stroke="#4a4a52" stroke-width="3" fill="none"/>
    </svg>`
  },
  rainbow: {
    emoji:'🌈',
    defaultFills:{ band1:'#ffffff', band2:'#ffffff', band3:'#ffffff', band4:'#ffffff', cloudL:'#ffffff', cloudR:'#ffffff' },
    svg: `
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 150 A90 90 0 0 1 190 150 L174 150 A74 74 0 0 0 26 150 Z" data-fillable data-part="band1"/>
      <path d="M26 150 A74 74 0 0 1 174 150 L158 150 A58 58 0 0 0 42 150 Z" data-fillable data-part="band2"/>
      <path d="M42 150 A58 58 0 0 1 158 150 L142 150 A42 42 0 0 0 58 150 Z" data-fillable data-part="band3"/>
      <path d="M58 150 A42 42 0 0 1 142 150 L126 150 A26 26 0 0 0 74 150 Z" data-fillable data-part="band4"/>
      <ellipse cx="25" cy="150" rx="26" ry="16" data-fillable data-part="cloudL"/>
      <ellipse cx="175" cy="150" rx="26" ry="16" data-fillable data-part="cloudR"/>
    </svg>`
  },
  balloon: {
    emoji:'🎈',
    defaultFills:{ b1:'#ffffff', b2:'#ffffff', b3:'#ffffff' },
    svg: `
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 160 L92 190 L108 190 Z" fill="none" stroke="#8a7d6a" stroke-width="2"/>
      <path d="M60 150 L60 190" stroke="#8a7d6a" stroke-width="2" fill="none"/>
      <path d="M140 150 L140 190" stroke="#8a7d6a" stroke-width="2" fill="none"/>
      <ellipse cx="60" cy="90" rx="38" ry="46" data-fillable data-part="b1"/>
      <ellipse cx="140" cy="90" rx="38" ry="46" data-fillable data-part="b2"/>
      <ellipse cx="100" cy="70" rx="40" ry="48" data-fillable data-part="b3"/>
    </svg>`
  },
  icecream: {
    emoji:'🍦',
    defaultFills:{ scoop1:'#ffffff', scoop2:'#ffffff', scoop3:'#ffffff', cone:'#e0ac74' },
    svg: `
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <path d="M75 120 L125 120 L100 210 Z" data-fillable data-part="cone"/>
      <line x1="80" y1="132" x2="118" y2="168" stroke="#a06f3d" stroke-width="2" opacity="0.5"/>
      <line x1="120" y1="132" x2="88" y2="168" stroke="#a06f3d" stroke-width="2" opacity="0.5"/>
      <circle cx="100" cy="95" r="38" data-fillable data-part="scoop1"/>
      <circle cx="72" cy="70" r="30" data-fillable data-part="scoop2"/>
      <circle cx="128" cy="70" r="30" data-fillable data-part="scoop3"/>
    </svg>`
  },
  fish: {
    emoji:'🐟',
    defaultFills:{ body:'#ffffff', tail:'#ffffff', finTop:'#ffffff', bubble1:'#ffffff', bubble2:'#ffffff' },
    svg: `
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <path d="M140 20 L170 55 L140 90 Z" data-fillable data-part="tail"/>
      <ellipse cx="90" cy="70" rx="60" ry="40" data-fillable data-part="body"/>
      <path d="M70 35 L95 20 L100 45 Z" data-fillable data-part="finTop"/>
      <circle cx="55" cy="62" r="7" fill="#3b3040"/>
      <circle cx="165" cy="30" r="8" data-fillable data-part="bubble1"/>
      <circle cx="180" cy="15" r="5" data-fillable data-part="bubble2"/>
    </svg>`
  }
};
