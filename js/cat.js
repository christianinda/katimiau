const CAT_COLORS = {
  black:  { body:'#5b5560', dark:'#46414a', light:'#7a7480', outline:'#2c2830' },
  white:  { body:'#fdfaf5', dark:'#e4dcd0', light:'#ffffff', outline:'#6b6058' },
  brown:  { body:'#c98f56', dark:'#a06f3d', light:'#e0ac74', outline:'#7a4f26' }
};

function outfitShape(clothing, color){
  if(!color) return '';
  switch(clothing){
    case 'tutu':
      return `
        <g stroke="#2c2830" stroke-width="2.5" stroke-linejoin="round">
          <ellipse cx="110" cy="185" rx="52" ry="16" fill="${color}"/>
          <ellipse cx="110" cy="178" rx="46" ry="15" fill="${color}"/>
          <ellipse cx="110" cy="171" rx="40" ry="14" fill="${color}"/>
        </g>`;
    case 'cape':
      return `
        <g stroke="#2c2830" stroke-width="2.5" stroke-linejoin="round">
          <path d="M70 145 Q110 165 150 145 L166 218 Q110 240 54 218 Z" fill="${color}"/>
          <path d="M100 148 L110 138 L120 148 L110 158 Z" fill="#ffd166"/>
        </g>`;
    case 'pajama':
      return `
        <g stroke="#2c2830" stroke-width="2.5" stroke-linejoin="round">
          <path d="M60 150 Q110 132 160 150 L160 220 Q110 236 60 220 Z" fill="${color}"/>
        </g>
        <g fill="#ffffff" opacity="0.85">
          <path d="M85 165 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1 Z"/>
          <path d="M130 180 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1 Z"/>
          <path d="M105 200 l2 5 l5 1 l-4 4 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -4 l5 -1 Z"/>
        </g>`;
    case 'tshirt':
      return `
        <g stroke="#2c2830" stroke-width="2.5" stroke-linejoin="round">
          <path d="M64 148 Q110 132 156 148 L156 190 Q110 202 64 190 Z" fill="${color}"/>
          <path d="M64 195 Q110 208 156 195 L156 218 Q110 232 64 218 Z" fill="#ffffff"/>
        </g>`;
    case 'dress':
      return `
        <g stroke="#2c2830" stroke-width="2.5" stroke-linejoin="round">
          <path d="M62 168 Q110 150 158 168 L158 205 Q110 225 62 205 Z" fill="${color}"/>
        </g>`;
    case 'overalls':
    default:
      return `
        <g stroke="#2c2830" stroke-width="2.5" stroke-linejoin="round">
          <path d="M62 168 Q110 150 158 168 L158 205 Q110 225 62 205 Z" fill="${color}"/>
        </g>`;
  }
}

function buildCatSVG({ color = 'black', clothing = 'none', shoes = 'none', asleep = false } = {}){
  const c = CAT_COLORS[color] || CAT_COLORS.black;
  const clothingColor = OUTFIT_CLOTHING_COLORS[clothing];
  const shoeColor = OUTFIT_SHOE_COLORS[shoes];
  const outline = c.outline;

  const eyes = asleep
    ? `<path d="M78 118 q10 8 20 0" stroke="${c.dark}" stroke-width="4" fill="none" stroke-linecap="round"/>
       <path d="M122 118 q10 8 20 0" stroke="${c.dark}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<g class="cat-eye" style="transform-origin:88px 118px">
         <circle cx="88" cy="118" r="7.5" fill="#3b3040"/>
         <circle cx="90.5" cy="115" r="2.4" fill="#fff"/>
       </g>
       <g class="cat-eye" style="transform-origin:132px 118px; animation-delay:.08s">
         <circle cx="132" cy="118" r="7.5" fill="#3b3040"/>
         <circle cx="134.5" cy="115" r="2.4" fill="#fff"/>
       </g>`;

  const clothingShape = outfitShape(clothing, clothingColor);

  const shoeShapes = shoeColor
    ? `<ellipse cx="78" cy="228" rx="14" ry="9" fill="${shoeColor}" stroke="${outline}" stroke-width="2"/>
       <ellipse cx="142" cy="228" rx="14" ry="9" fill="${shoeColor}" stroke="${outline}" stroke-width="2"/>`
    : '';

  return `
  <svg viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Katimiau">
    <ellipse cx="110" cy="225" rx="46" ry="9" fill="rgba(0,0,0,0.08)"/>
    <path class="cat-tail" style="transform-origin:158px 150px" d="M158 150 Q195 140 190 100 Q188 80 172 88 Q182 110 158 130 Z" fill="${c.body}" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="82" cy="222" rx="17" ry="14" fill="${c.body}" stroke="${outline}" stroke-width="2.5"/>
    <ellipse cx="138" cy="222" rx="17" ry="14" fill="${c.body}" stroke="${outline}" stroke-width="2.5"/>
    ${shoeShapes}
    <rect x="58" y="130" width="104" height="90" rx="42" fill="${c.body}" stroke="${outline}" stroke-width="3"/>
    ${clothingShape}
    <circle cx="110" cy="105" r="58" fill="${c.body}" stroke="${outline}" stroke-width="3"/>
    <path d="M60 78 L48 30 L96 66 Z" fill="${c.body}" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M66 68 L58 40 L86 62 Z" fill="${c.light}"/>
    <path d="M160 78 L172 30 L124 66 Z" fill="${c.body}" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/>
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
