const STORAGE_KEY = 'katimiau-save-v1';

const DEFAULT_STATE = {
  catColor: null,
  outfitClothing: 'none',
  outfitShoes: 'none',
  language: 'es',
  hearts: 0,
  coloring: {}
};

const State = (function(){
  let data = load();

  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return {...DEFAULT_STATE};
      return {...DEFAULT_STATE, ...JSON.parse(raw)};
    }catch(e){
      return {...DEFAULT_STATE};
    }
  }

  function save(){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }catch(e){ /* storage unavailable, ignore */ }
  }

  return {
    get(){ return data; },
    set(patch){
      data = {...data, ...patch};
      save();
    },
    addHeart(){
      data.hearts = (data.hearts || 0) + 1;
      save();
      return data.hearts;
    },
    setColoringPart(templateId, partId, color){
      if(!data.coloring[templateId]) data.coloring[templateId] = {};
      data.coloring[templateId][partId] = color;
      save();
    },
    clearColoring(templateId){
      data.coloring[templateId] = {};
      save();
    },
    reset(){
      data = {...DEFAULT_STATE};
      save();
    }
  };
})();
