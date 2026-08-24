const I18N = {
  es: {
    "nav.home": "Inicio",
    "nav.back": "Volver",
    "select.title": "¡Elige tu gatito!",
    "house.title": "La casa de Katimiau",
    "house.changeCat": "Cambiar de gatito",
    "rooms.bathroom": "Baño",
    "rooms.kitchen": "Cocina",
    "rooms.bedroom": "Dormitorio",
    "rooms.artroom": "Taller de arte",
    "kitchen.food": "Comida",
    "kitchen.drink": "Bebida",
    "bedroom.outfits": "Vestir a Katimiau",
    "bedroom.stories": "Cuento para dormir",
    "bedroom.sleepNow": "Dormir con este cuento 🌙",
    "bedroom.sleeping": "Katimiau está durmiendo... 😴",
    "bedroom.wake": "Despertar",
    "art.clear": "Limpiar dibujo",
    "cats.black": "Negro",
    "cats.white": "Blanco",
    "cats.brown": "Cafesito",
    "select.choose": "¡Este quiero!",
    "bathroom.pee": "Hacer pipí",
    "bathroom.poop": "Hacer caca",
    "bathroom.bath": "Bañarse",
    "bathroom.teeth": "Lavar los dientes",
    "food.tuna": "Atún con chips de carne",
    "food.egg": "Huevo con comida de gato",
    "food.salad": "Lechuga con tomate",
    "drink.water": "Agua",
    "drink.milk": "Leche",
    "outfit.none": "Sin ropa",
    "outfit.dress": "Vestido rosa",
    "outfit.overalls": "Overol lavanda",
    "outfit.shoesNone": "Sin zapatos",
    "outfit.shoesRed": "Zapatos rojos",
    "outfit.shoesYellow": "Zapatos amarillos",
    "story.bee.title": "El cuento de la abeja",
    "story.bee.text": "Había una vez una abejita llamada Miely que volaba de flor en flor buscando el atardecer más bonito del jardín. Cuando por fin lo encontró, se acurrucó entre los pétalos calentitos, escuchó el viento cantarle bajito y cerró los ojitos, feliz y tranquila, hasta quedarse profundamente dormida.",
    "story.frog.title": "El cuento del sapito",
    "story.frog.text": "Un sapito saltarín llamado Cuac vivía junto a un estanque de aguas tranquilas. Cada noche se sentaba sobre su hoja favorita, miraba las estrellitas reflejadas en el agua y les contaba en secreto todo lo lindo que había hecho ese día. Luego, arrullado por el croar suave de sus amigos, se dormía flotando despacito.",
    "story.unicorn.title": "El cuento del unicornio",
    "story.unicorn.text": "En un bosque de nubes vivía un unicornio llamado Destello, con una crin que brillaba como el arcoíris. Cada noche galopaba despacito entre las estrellas, dejando un caminito de polvitos mágicos detrás de él. Cuando encontraba la nube más suave, se recostaba sobre ella y soñaba con nuevas aventuras.",
    "app.title": "Katimiau"
  },
  en: {
    "nav.home": "Home",
    "nav.back": "Back",
    "select.title": "Choose your kitty!",
    "house.title": "Katimiau's House",
    "house.changeCat": "Change kitty",
    "rooms.bathroom": "Bathroom",
    "rooms.kitchen": "Kitchen",
    "rooms.bedroom": "Bedroom",
    "rooms.artroom": "Art Studio",
    "kitchen.food": "Food",
    "kitchen.drink": "Drink",
    "bedroom.outfits": "Dress up Katimiau",
    "bedroom.stories": "Bedtime story",
    "bedroom.sleepNow": "Sleep with this story 🌙",
    "bedroom.sleeping": "Katimiau is sleeping... 😴",
    "bedroom.wake": "Wake up",
    "art.clear": "Clear drawing",
    "cats.black": "Black",
    "cats.white": "White",
    "cats.brown": "Brown",
    "select.choose": "I want this one!",
    "bathroom.pee": "Pee",
    "bathroom.poop": "Poop",
    "bathroom.bath": "Take a bath",
    "bathroom.teeth": "Brush teeth",
    "food.tuna": "Tuna with meat chips",
    "food.egg": "Egg with cat food",
    "food.salad": "Lettuce with tomato",
    "drink.water": "Water",
    "drink.milk": "Milk",
    "outfit.none": "No outfit",
    "outfit.dress": "Pink dress",
    "outfit.overalls": "Lavender overalls",
    "outfit.shoesNone": "No shoes",
    "outfit.shoesRed": "Red shoes",
    "outfit.shoesYellow": "Yellow shoes",
    "story.bee.title": "The Bee's Tale",
    "story.bee.text": "Once there was a little bee named Miely who flew from flower to flower looking for the prettiest sunset in the garden. When she finally found it, she snuggled among the warm petals, listened to the wind sing softly, and closed her little eyes, happy and calm, until she fell fast asleep.",
    "story.frog.title": "The Little Frog's Tale",
    "story.frog.text": "A hoppy little frog named Ribbit lived by a calm pond. Every night he sat on his favorite leaf, watched the tiny stars reflected in the water, and told them a secret about all the lovely things he did that day. Then, rocked by his friends' soft croaking, he drifted off to sleep, floating gently.",
    "story.unicorn.title": "The Unicorn's Tale",
    "story.unicorn.text": "In a cloud forest lived a unicorn named Sparkle, with a mane that shimmered like a rainbow. Every night she trotted slowly among the stars, leaving a trail of magic dust behind her. When she found the softest cloud, she lay down upon it and dreamed of new adventures.",
    "app.title": "Katimiau"
  }
};

function t(key){
  const lang = State.get().language || 'es';
  return (I18N[lang] && I18N[lang][key]) || (I18N.es[key]) || key;
}

function applyI18n(){
  document.documentElement.lang = State.get().language || 'es';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });
  const langLabel = document.getElementById('lang-label');
  if(langLabel) langLabel.textContent = (State.get().language || 'es').toUpperCase();
}
