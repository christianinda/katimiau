const CAT_OPTIONS = [
  { id:'black', nameKey:'cats.black' },
  { id:'white', nameKey:'cats.white' },
  { id:'brown', nameKey:'cats.brown' }
];

const BATHROOM_ACTIONS = [
  { id:'pee',   labelKey:'bathroom.pee',   emoji:'💦', fx:'💦' },
  { id:'poop',  labelKey:'bathroom.poop',  emoji:'💩', fx:'💩' },
  { id:'bath',  labelKey:'bathroom.bath',  emoji:'🛁', fx:'🫧' },
  { id:'teeth', labelKey:'bathroom.teeth', emoji:'🪥', fx:'✨' }
];

const KITCHEN_FOOD = [
  { id:'tuna',  labelKey:'food.tuna',  emoji:'🐟', fx:'😋' },
  { id:'egg',   labelKey:'food.egg',   emoji:'🥚', fx:'😋' },
  { id:'salad', labelKey:'food.salad', emoji:'🥗', fx:'😋' }
];

const KITCHEN_DRINK = [
  { id:'water', labelKey:'drink.water', emoji:'💧', fx:'😊' },
  { id:'milk',  labelKey:'drink.milk',  emoji:'🥛', fx:'😊' }
];

const OUTFIT_CLOTHING = [
  { id:'none',     labelKey:'outfit.none' },
  { id:'dress',    labelKey:'outfit.dress' },
  { id:'overalls', labelKey:'outfit.overalls' }
];

const OUTFIT_SHOES = [
  { id:'none',        labelKey:'outfit.shoesNone' },
  { id:'shoesRed',    labelKey:'outfit.shoesRed' },
  { id:'shoesYellow', labelKey:'outfit.shoesYellow' }
];

const STORIES = [
  { id:'bee',      emoji:'🐝', titleKey:'story.bee.title',      textKey:'story.bee.text' },
  { id:'frog',     emoji:'🐸', titleKey:'story.frog.title',     textKey:'story.frog.text' },
  { id:'unicorn',  emoji:'🦄', titleKey:'story.unicorn.title',  textKey:'story.unicorn.text' }
];

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
      <g stroke="#8a7d6a" stroke-width="2" fill="none" opacity="0.35">
        <line x1="100" y1="120" x2="100" y2="200"/>
      </g>
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
    defaultFills:{ center:'#ffd166', rays:'#ffe1a1', faceL:'#3b3040', faceR:'#3b3040' },
    svg: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g data-fillable data-part="rays">
        <g id="rays-group">
          <path d="M100 10 L108 40 L92 40 Z"/>
          <path d="M100 190 L108 160 L92 160 Z"/>
          <path d="M10 100 L40 92 L40 108 Z"/>
          <path d="M190 100 L160 92 L160 108 Z"/>
          <path d="M35 35 L58 50 L50 58 Z"/>
          <path d="M165 165 L142 150 L150 142 Z"/>
          <path d="M35 165 L58 150 L50 142 Z"/>
          <path d="M165 35 L142 50 L150 58 Z"/>
        </g>
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
  }
};
