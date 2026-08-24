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

function bubbleFx(layerId, text){
  const layer = document.getElementById(layerId);
  if(!layer) return;
  const span = document.createElement('span');
  span.className = 'fx-bubble';
  span.textContent = text;
  layer.appendChild(span);
  setTimeout(()=>{ span.remove(); }, 1600);
}

function randomReaction(){
  const lang = State.get().language || 'es';
  const pool = BATHROOM_REACTIONS[lang] || BATHROOM_REACTIONS.es;
  return pickRandom(pool);
}

function bumpHearts(){
  const val = State.addHeart();
  const el = document.getElementById('hearts-value');
  if(el) el.textContent = val;
  if(KatiAudio) KatiAudio.sfx.heart();
}

function popBtn(btn){
  btn.classList.remove('pop');
  void btn.offsetWidth;
  btn.classList.add('pop');
}

function buildActionButton({ emoji, label, onClick, selected }){
  const btn = document.createElement('button');
  btn.className = 'action-btn' + (selected ? ' selected' : '');
  btn.innerHTML = `<span class="a-emoji">${emoji}</span><span>${label}</span>`;
  btn.addEventListener('click', ()=>{
    popBtn(btn);
    onClick();
  });
  return btn;
}

function renderBathroom(){
  renderCat('bathroom-cat-svg-wrap', currentCatOpts());
  const grid = document.getElementById('bathroom-actions');
  grid.innerHTML = '';
  BATHROOM_ACTIONS.forEach(a=>{
    grid.appendChild(buildActionButton({
      emoji:a.emoji,
      label:biLabel(a.labelKey),
      onClick:()=>{
        popFx('bathroom-fx', a.fx);
        if(KatiAudio && KatiAudio.sfx[a.sfx]) KatiAudio.sfx[a.sfx]();
        setTimeout(()=> bubbleFx('bathroom-fx', randomReaction()), 250);
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
      label:biLabel(f.labelKey),
      onClick:()=>{
        popFx('kitchen-fx', '😋');
        let chews = 0;
        const chewTimer = setInterval(()=>{
          if(KatiAudio) KatiAudio.sfx.chew();
          chews++;
          if(chews >= 3){
            clearInterval(chewTimer);
            const lang = State.get().language || 'es';
            KatiAudio.speak(t('food.thanks'), lang);
            bubbleFx('kitchen-fx', t('food.thanks'));
          }
        }, 260);
        bumpHearts();
      }
    }));
  });
  const drinkGrid = document.getElementById('kitchen-drink-actions');
  drinkGrid.innerHTML = '';
  KITCHEN_DRINK.forEach(d=>{
    drinkGrid.appendChild(buildActionButton({
      emoji:d.emoji,
      label:biLabel(d.labelKey),
      onClick:()=>{
        popFx('kitchen-fx', '😊');
        if(KatiAudio) KatiAudio.sfx.drink();
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
      label:biLabel(o.labelKey),
      selected: s.outfitClothing === o.id,
      onClick:()=>{
        State.set({ outfitClothing:o.id });
        if(KatiAudio) KatiAudio.sfx.dress();
        bumpHearts();
        renderBedroom();
      }
    }));
  });
  OUTFIT_SHOES.forEach(o=>{
    outfitGrid.appendChild(buildActionButton({
      emoji:'👟',
      label:biLabel(o.labelKey),
      selected: s.outfitShoes === o.id,
      onClick:()=>{
        State.set({ outfitShoes:o.id });
        if(KatiAudio) KatiAudio.sfx.dress();
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
      onClick:()=> openStoryModal({ titleText:t(story.titleKey), bodyText:t(story.textKey) })
    }));
  });

  const surpriseBtn = document.getElementById('bedroom-surprise-btn');
  surpriseBtn.onclick = ()=>{
    const lang = State.get().language || 'es';
    const story = generateRandomStory(lang);
    openStoryModal({ titleText: story.title, bodyText: story.text });
  };
}

function openStoryModal({ titleText, bodyText }){
  document.getElementById('story-modal-title').textContent = titleText;
  document.getElementById('story-modal-text').textContent = bodyText;
  const modal = document.getElementById('story-modal');
  modal.classList.remove('hidden');

  const listenBtn = document.getElementById('story-listen-btn');
  listenBtn.textContent = t('bedroom.listen');
  listenBtn.disabled = false;
  listenBtn.onclick = ()=>{
    if(listenBtn.disabled) return;
    const lang = State.get().language || 'es';
    listenBtn.disabled = true;
    listenBtn.textContent = t('bedroom.listening');
    KatiAudio.speak(bodyText, lang, {
      onEnd: ()=>{
        listenBtn.disabled = false;
        listenBtn.textContent = t('bedroom.listen');
      }
    });
  };

  const sleepBtn = document.getElementById('story-sleep-btn');
  sleepBtn.onclick = ()=>{
    KatiAudio.stopSpeak();
    listenBtn.disabled = false;
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
    KatiAudio.stopSpeak();
    document.getElementById('story-listen-btn').disabled = false;
    document.getElementById('story-modal').classList.add('hidden');
  });
  document.getElementById('wake-btn').addEventListener('click', ()=>{
    document.getElementById('sleep-overlay').classList.add('hidden');
    renderBedroom();
  });
}
