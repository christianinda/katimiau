let currentArtTemplateId = 'flower';
let currentArtColor = ART_PALETTE[0];

function renderArtTemplatePicker(){
  const picker = document.getElementById('art-template-picker');
  picker.innerHTML = '';
  Object.keys(ART_TEMPLATES).forEach(id=>{
    const tpl = ART_TEMPLATES[id];
    const btn = document.createElement('button');
    btn.className = 'action-btn' + (id === currentArtTemplateId ? ' selected' : '');
    btn.innerHTML = `<span class="a-emoji">${tpl.emoji}</span>`;
    btn.addEventListener('click', ()=>{
      currentArtTemplateId = id;
      renderArtTemplatePicker();
      renderArtCanvas();
    });
    picker.appendChild(btn);
  });
}

function renderArtPalette(){
  const palette = document.getElementById('art-palette');
  palette.innerHTML = '';
  ART_PALETTE.forEach(color=>{
    const sw = document.createElement('button');
    sw.className = 'palette-swatch' + (color === currentArtColor ? ' active' : '');
    sw.style.background = color;
    sw.addEventListener('click', ()=>{
      currentArtColor = color;
      renderArtPalette();
    });
    palette.appendChild(sw);
  });
}

function renderArtCanvas(){
  const tpl = ART_TEMPLATES[currentArtTemplateId];
  const wrap = document.getElementById('art-svg-wrap');
  wrap.innerHTML = tpl.svg;
  const svg = wrap.querySelector('svg');
  const saved = State.get().coloring[currentArtTemplateId] || {};

  svg.querySelectorAll('[data-fillable]').forEach(node=>{
    const part = node.getAttribute('data-part');
    const fill = saved[part] || tpl.defaultFills[part] || '#ffffff';
    node.setAttribute('fill', fill);
    node.addEventListener('click', (e)=>{
      e.stopPropagation();
      node.setAttribute('fill', currentArtColor);
      State.setColoringPart(currentArtTemplateId, part, currentArtColor);
      if(KatiAudio) KatiAudio.sfx.paint();
      bumpHearts();
    });
  });
}

function initArtRoom(){
  renderArtTemplatePicker();
  renderArtPalette();
  renderArtCanvas();

  document.getElementById('art-clear-btn').addEventListener('click', ()=>{
    State.clearColoring(currentArtTemplateId);
    renderArtCanvas();
  });
}
