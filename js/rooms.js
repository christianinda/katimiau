function popFx(layerId, emoji){
  const layer = document.getElementById(layerId);
  if(!layer) return;
  const span = document.createElement('span');
  span.className = 'fx-pop';
  span.textContent = emoji;
  layer.innerHTML = '';
  layer.appendChild(span);
  setTimeout(()=>{ span.remove(); }, 1000);
}

function bumpHearts(){
  const val = State.addHeart();
  const el = document.getElementById('hearts-value');
  if(el) el.textContent = val;
}

function buildActionButton({ emoji, label, onClick, selected }){
  const btn = document.createElement('button');
  btn.className = 'action-btn' + (selected ? ' selected' : '');
  btn.innerHTML = `<span class="a-emoji">${emoji}</span><span>${label}</span>`;
  btn.addEventListener('click', onClick);
  return btn;
}

function renderBathroom(){
  renderCat('bathroom-cat-svg-wrap', currentCatOpts());
  const grid = document.getElementById('bathroom-actions');
  grid.innerHTML = '';
  BATHROOM_ACTIONS.forEach(a=>{
    grid.appendChild(buildActionButton({
      emoji:a.emoji,
      label:t(a.labelKey),
      onClick:()=>{
        popFx('bathroom-fx', a.fx);
        bumpHearts();
      }
    }));
  });
}

function renderKitchen(){
  renderCat('kitchen-cat-svg-wrap', currentCatOpts());
  const foodGrid = document.getElementById('kitchen-food-actions');
  foodGrid.innerHTML = '';
  KITCHEN_FOOD.forEach(f=>{
    foodGrid.appendChild(buildActionButton({
      emoji:f.emoji,
      label:t(f.labelKey),
      onClick:()=>{
        popFx('kitchen-fx', f.fx);
        bumpHearts();
      }
    }));
  });
  const drinkGrid = document.getElementById('kitchen-drink-actions');
  drinkGrid.innerHTML = '';
  KITCHEN_DRINK.forEach(d=>{
    drinkGrid.appendChild(buildActionButton({
      emoji:d.emoji,
      label:t(d.labelKey),
      onClick:()=>{
        popFx('kitchen-fx', d.fx);
        bumpHearts();
      }
    }));
  });
}

function renderBedroom(){
  renderCat('bedroom-cat-svg-wrap', currentCatOpts());
  const s = State.get();

  const outfitGrid = document.getElementById('bedroom-outfit-actions');
  outfitGrid.innerHTML = '';
  OUTFIT_CLOTHING.forEach(o=>{
    outfitGrid.appendChild(buildActionButton({
      emoji:'👕',
      label:t(o.labelKey),
      selected: s.outfitClothing === o.id,
      onClick:()=>{
        State.set({ outfitClothing:o.id });
        bumpHearts();
        renderBedroom();
      }
    }));
  });
  OUTFIT_SHOES.forEach(o=>{
    outfitGrid.appendChild(buildActionButton({
      emoji:'👟',
      label:t(o.labelKey),
      selected: s.outfitShoes === o.id,
      onClick:()=>{
        State.set({ outfitShoes:o.id });
        bumpHearts();
        renderBedroom();
      }
    }));
  });

  const storyGrid = document.getElementById('bedroom-story-actions');
  storyGrid.innerHTML = '';
  STORIES.forEach(story=>{
    storyGrid.appendChild(buildActionButton({
      emoji:story.emoji,
      label:t(story.titleKey),
      onClick:()=> openStoryModal(story)
    }));
  });
}

function openStoryModal(story){
  document.getElementById('story-modal-title').textContent = t(story.titleKey);
  document.getElementById('story-modal-text').textContent = t(story.textKey);
  const modal = document.getElementById('story-modal');
  modal.classList.remove('hidden');
  const sleepBtn = document.getElementById('story-sleep-btn');
  sleepBtn.onclick = ()=>{
    modal.classList.add('hidden');
    openSleepOverlay();
  };
}

function openSleepOverlay(){
  renderCat('sleep-cat-svg-wrap', currentCatOpts({ asleep:true }));
  bumpHearts();
  document.getElementById('sleep-overlay').classList.remove('hidden');
}

function initModalCloseHandlers(){
  document.getElementById('story-modal-close').addEventListener('click', ()=>{
    document.getElementById('story-modal').classList.add('hidden');
  });
  document.getElementById('wake-btn').addEventListener('click', ()=>{
    document.getElementById('sleep-overlay').classList.add('hidden');
    renderBedroom();
  });
}
