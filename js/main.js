function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome(){
  if(!State.get().catColor){
    renderCatSelect();
    showScreen('screen-select');
  } else {
    renderCat('house-cat-svg-wrap', currentCatOpts());
    showScreen('screen-house');
  }
}

function renderCatSelect(){
  const grid = document.getElementById('cat-select-grid');
  grid.innerHTML = '';
  CAT_OPTIONS.forEach(opt=>{
    const card = document.createElement('button');
    card.className = 'cat-option';
    card.innerHTML = `${buildCatSVG({ color:opt.id })}<span class="cat-name">${t(opt.nameKey)}</span><span>${t('select.choose')}</span>`;
    card.addEventListener('click', ()=>{
      State.set({ catColor: opt.id });
      goHome();
    });
    grid.appendChild(card);
  });
}

function openRoom(roomId){
  showScreen('screen-' + roomId);
  if(roomId === 'bathroom') renderBathroom();
  if(roomId === 'kitchen') renderKitchen();
  if(roomId === 'bedroom') renderBedroom();
  if(roomId === 'artroom') initArtRoom();
}

function initNavigation(){
  document.getElementById('home-btn').addEventListener('click', goHome);

  document.querySelectorAll('.room-card').forEach(card=>{
    card.addEventListener('click', ()=> openRoom(card.getAttribute('data-room')));
  });

  document.querySelectorAll('[data-back]').forEach(btn=>{
    btn.addEventListener('click', goHome);
  });

  document.getElementById('change-cat-btn').addEventListener('click', ()=>{
    renderCatSelect();
    showScreen('screen-select');
  });

  document.getElementById('lang-toggle').addEventListener('click', ()=>{
    const next = (State.get().language === 'es') ? 'en' : 'es';
    State.set({ language: next });
    applyI18n();
    refreshCurrentScreen();
  });
}

function refreshCurrentScreen(){
  const active = document.querySelector('.screen.active');
  if(!active) return;
  if(active.id === 'screen-select') renderCatSelect();
  if(active.id === 'screen-house') { /* static texts already refreshed by applyI18n */ }
  if(active.id === 'screen-bathroom') renderBathroom();
  if(active.id === 'screen-kitchen') renderKitchen();
  if(active.id === 'screen-bedroom') renderBedroom();
  if(active.id === 'screen-artroom'){ renderArtTemplatePicker(); renderArtCanvas(); }
}

function init(){
  applyI18n();
  document.getElementById('hearts-value').textContent = State.get().hearts || 0;
  initNavigation();
  initModalCloseHandlers();
  goHome();
}

document.addEventListener('DOMContentLoaded', init);
