const CAT_COLORS = {
  black:  { body:'#5b5560', dark:'#46414a', light:'#7a7480' },
  white:  { body:'#fdfaf5', dark:'#e4dcd0', light:'#ffffff' },
  brown:  { body:'#c98f56', dark:'#a06f3d', light:'#e0ac74' }
};

const OUTFIT_CLOTHING_COLORS = {
  none: null,
  dress: '#ff9ec7',
  overalls: '#c9b6ff'
};

const OUTFIT_SHOE_COLORS = {
  none: null,
  shoesRed: '#ff6b6b',
  shoesYellow: '#ffd166'
};

function buildCatSVG({ color = 'black', clothing = 'none', shoes = 'none', asleep = false } = {}){
  const c = CAT_COLORS[color] || CAT_COLORS.black;
  const clothingColor = OUTFIT_CLOTHING_COLORS[clothing];
  const shoeColor = OUTFIT_SHOE_COLORS[shoes];

  const eyes = asleep
    ? `<path d="M78 118 q10 8 20 0" stroke="${c.dark}" stroke-width="4" fill="none" stroke-linecap="round"/>
       <path d="M122 118 q10 8 20 0" stroke="${c.dark}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<circle cx="88" cy="118" r="7" fill="#3b3040"/>
       <circle cx="132" cy="118" r="7" fill="#3b3040"/>
       <circle cx="90.5" cy="115.5" r="2.2" fill="#fff"/>
       <circle cx="134.5" cy="115.5" r="2.2" fill="#fff"/>`;

  const clothingShape = clothingColor
    ? `<path d="M62 168 Q110 150 158 168 L158 205 Q110 225 62 205 Z" fill="${clothingColor}" stroke="rgba(0,0,0,0.06)"/>`
    : '';

  const shoeShapes = shoeColor
    ? `<ellipse cx="78" cy="228" rx="14" ry="9" fill="${shoeColor}"/>
       <ellipse cx="142" cy="228" rx="14" ry="9" fill="${shoeColor}"/>`
    : '';

  return `
  <svg viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Katimiau">
    <ellipse cx="110" cy="225" rx="46" ry="9" fill="rgba(0,0,0,0.08)"/>
    <path d="M158 150 Q195 140 190 100 Q188 80 172 88 Q182 110 158 130 Z" fill="${c.body}"/>
    <ellipse cx="82" cy="222" rx="17" ry="14" fill="${c.body}"/>
    <ellipse cx="138" cy="222" rx="17" ry="14" fill="${c.body}"/>
    ${shoeShapes}
    <rect x="58" y="130" width="104" height="90" rx="42" fill="${c.body}"/>
    ${clothingShape}
    <circle cx="110" cy="105" r="58" fill="${c.body}"/>
    <path d="M60 78 L48 30 L96 66 Z" fill="${c.body}"/>
    <path d="M66 68 L58 40 L86 62 Z" fill="${c.light}"/>
    <path d="M160 78 L172 30 L124 66 Z" fill="${c.body}"/>
    <path d="M154 68 L162 40 L134 62 Z" fill="${c.light}"/>
    <ellipse cx="70" cy="128" rx="10" ry="7" fill="#ffc9de" opacity="0.8"/>
    <ellipse cx="150" cy="128" rx="10" ry="7" fill="#ffc9de" opacity="0.8"/>
    ${eyes}
    <path d="M104 132 Q110 138 116 132 Q112 140 104 132" fill="#ff9ec7"/>
    <path d="M40 128 L8 122 M40 134 L6 134 M40 140 L10 148" stroke="${c.dark}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
    <path d="M180 128 L212 122 M180 134 L214 134 M180 140 L210 148" stroke="${c.dark}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
  </svg>`;
}

function renderCat(containerId, opts){
  const el = document.getElementById(containerId);
  if(el) el.innerHTML = buildCatSVG(opts);
}

function currentCatOpts(extra = {}){
  const s = State.get();
  return {
    color: s.catColor || 'black',
    clothing: s.outfitClothing || 'none',
    shoes: s.outfitShoes || 'none',
    ...extra
  };
}
