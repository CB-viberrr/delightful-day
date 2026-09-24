// SOLO "Spark": personal "what could I do tonight?" ideas. Owned by the Solo squad. Edit only this file.
const SOLO_JOKES = [
  "I tried to be spontaneous tonight, but I needed three business days' notice.",
  "I asked the group chat what we're doing tonight. 47 messages later, nobody has decided anything and someone sent a picture of a raccoon.",
  "\"I'm five minutes away\" is the biggest lie since \"I'll just watch one episode.\"",
  "I have two moods: \"let's go dancing!\" and \"if anyone texts me, tell them I've moved to the woods.\"",
  "Tonight's plan: leave the house. Backup plan: think about leaving the house. Backup backup plan: nap.",
  "Getting ready takes me two hours. Deciding to stay home takes me two seconds.",
  "My wallet is like an onion. Opening it makes me cry, so tonight's activity is free.",
  "I RSVP'd \"maybe\" to my own birthday party.",
  "Why don't skeletons go out on Friday nights? They have no body to go with.",
  "Me at 6pm: \"I'm going OUT tonight.\" Me at 9pm: in pajamas, narrating my cat's life in a British accent.",
  "I love making plans. But canceling them? That's a spiritual experience.",
  "My friends said \"come out tonight, it'll be fun.\" That's also what the iceberg told the Titanic.",
];
const SOLO_WORDS = [
  ['Lollygag', 'to spend time aimlessly', "Stop lollygagging and pick an idea!"],
  ['Kerfuffle', 'a commotion or fuss', "The group chat is in a full kerfuffle about dinner."],
  ['Petrichor', 'the lovely smell after rain', "Rain tonight? Go outside and sniff the petrichor."],
  ['Flâneur', 'someone who strolls around just to enjoy the city', "Tonight, be a flâneur."],
  ['Snollygoster', 'a clever, sneaky person', "Only a snollygoster would leave before the bill arrives."],
  ['Collywobbles', 'butterflies in your stomach', "First-date collywobbles are totally normal."],
  ['Apricity', 'the warmth of the sun in winter', "Soak up some apricity before sunset."],
  ['Bumfuzzle', 'to confuse', "Too many options can bumfuzzle anyone."],
  ['Crepuscular', 'relating to twilight', "Crepuscular walks are the best walks."],
  ['Brouhaha', 'a noisy overreaction', "Picking a restaurant shouldn't be a brouhaha."],
  ['Hygge', 'cozy, warm contentment (Danish)', "Staying in? Make it hygge: candles, blanket, snacks."],
  ['Gallivant', 'to go around having fun', "Tonight we gallivant."],
];
const SOLO_FACTS = [
  "A group of flamingos is called a \"flamboyance.\"",
  "Octopuses have three hearts and blue blood.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
  "Bananas are berries, but strawberries aren't.",
  "Wombat poop is cube-shaped.",
  "A day on Venus is longer than its year.",
  "The shortest war in history lasted about 38 minutes.",
  "The Eiffel Tower grows about 15 cm taller in summer because the metal expands.",
  "Cows can have best friends.",
];
// Open-Meteo weather codes -> [emoji, words]
const soloWeather = c => c === 0 ? ['☀️', 'Clear'] : c <= 2 ? ['🌤️', 'Partly cloudy'] : c === 3 ? ['☁️', 'Cloudy']
  : c <= 48 ? ['🌫️', 'Foggy'] : c <= 67 ? ['🌧️', 'Rainy'] : c <= 77 ? ['❄️', 'Snowy'] : c <= 82 ? ['🌦️', 'Showers'] : ['⛈️', 'Stormy'];
const soloWeatherTip = (t, c) => c >= 51 ? 'Cozy night in, or find an indoor adventure.'
  : t < 40 ? 'Bundle up! Hot cocoa weather.' : t > 80 ? 'Warm night: perfect for ice cream.' : 'Great night to be outside.';
// Real hourly forecast from Open-Meteo (downloaded 2026-09-24, good for 16 days). Used when the site blocks live weather.
const SOLO_FORECAST = {"Boston":{"start":1790208000,"t":[54,53,52,52,51,51,51,51,50,50,51,51,55,59,61,62,62,63,62,62,61,60,58,55,54,53,52,51,51,52,51,52,51,51,53,54,57,59,60,61,61,60,60,59,59,58,58,57,56,57,57,56,56,56,56,56,55,55,55,55,55,55,54,54,54,54,54,54,54,54,54,54,54,54,55,54,55,55,55,55,55,55,55,55,55,55,54,55,54,54,54,54,54,55,56,56,56,56,56,56,56,56,56,56,56,55,54,53,53,53,53,53,53,53,53,53,53,53,54,54,54,54,54,55,55,55,55,55,55,55,55,55,56,56,57,58,58,58,58,59,60,61,60,60,59,59,59,59,59,59,59,58,58,57,57,58,59,61,63,64,65,66,66,66,66,66,65,64,63,62,61,61,61,62,62,63,64,64,65,66,66,66,65,66,68,71,74,74,73,72,70,67,65,64,63,62,61,60,60,59,57,57,56,55,56,58,61,63,65,67,68,68,68,67,65,63,61,59,58,57,57,56,56,55,55,55,55,55,57,59,62,65,68,69,70,70,70,69,68,66,64,62,61,60,60,59,59,58,58,58,58,58,58,58,58,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,60,60,59,59,58,58,57,57,57,57,57,57,57,57,57,57,57,57,57,56,56,57,57,57,57,57,57,57,56,55,54,54,54,54,53,52,52,51,50,50,50,49,50,52,56,58,60,61,62,62,62,62,60,58,56,55,54,53,53,52,52,51,51,50,50,50,50,52,54,55,56,56,56,56,56,55,55,54,54,53,53,52,52,52,52,52,52,52,52,52,53,55,58,60,62,63,63,null,null,null,null,null],"c":[0,1,0,1,0,0,0,0,0,1,1,2,1,2,1,1,1,1,0,0,3,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,51,51,3,51,53,51,53,61,63,63,63,63,63,63,65,63,51,51,53,53,53,51,51,51,63,63,61,53,63,61,63,63,63,55,53,51,53,51,51,53,63,61,61,61,80,80,61,55,51,51,53,61,55,61,55,53,51,53,53,53,53,53,53,51,51,51,51,51,51,51,3,3,3,51,51,51,51,51,51,51,51,51,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,61,61,61,53,53,53,3,2,1,1,0,0,0,0,0,0,0,0,1,1,2,2,1,0,0,0,0,0,0,0,0,0,1,1,2,3,3,3,3,3,3,3,2,1,0,0,1,2,3,3,3,3,2,2,2,2,2,2,2,2,2,3,3,51,51,51,53,53,53,53,53,53,63,63,63,63,63,63,81,81,81,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,3,3,3,3,3,3,3,3,3,51,51,51,61,61,61,63,63,63,63,63,63,63,63,63,55,55,55,53,53,53,51,51,51,3,3,3,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,3,3,3,2,2,1,0,1,2,3,3,3,2,2,2,3,3,3,3,3,3,3,3,3,2,2,1,1,2,3,3,null,null,null,null,null]},"New York":{"start":1790208000,"t":[62,59,57,55,54,53,52,52,51,51,50,50,52,56,57,59,61,61,62,65,65,65,64,62,60,58,56,55,54,53,52,51,51,52,52,52,54,58,61,64,67,70,71,73,73,73,70,68,66,66,64,63,62,61,60,60,59,59,58,58,59,62,64,67,69,72,73,73,74,73,71,69,68,66,63,61,59,59,58,57,57,57,56,56,56,57,57,58,59,56,56,57,57,57,57,58,58,57,58,57,57,57,57,58,58,58,58,57,58,59,59,62,64,67,68,68,68,68,67,66,66,65,65,64,64,64,63,63,63,63,62,62,62,64,66,68,70,72,74,75,75,74,73,71,69,69,69,69,68,67,67,66,66,65,65,65,65,66,68,69,70,71,72,72,71,71,71,70,70,70,70,71,70,70,70,70,70,69,69,68,67,67,68,68,69,71,72,71,70,69,68,67,66,65,63,62,61,61,60,59,59,58,58,58,59,60,63,66,68,71,72,73,73,73,72,71,69,68,67,66,66,65,64,64,63,63,63,63,63,64,65,66,65,64,62,61,60,59,59,59,59,59,60,60,61,61,61,61,61,61,61,61,61,62,62,63,64,65,66,68,69,70,69,68,67,66,66,65,65,65,65,65,65,65,65,65,65,65,65,65,64,64,63,63,63,64,63,63,63,63,63,63,63,63,62,62,61,61,61,61,61,61,60,59,59,59,59,59,59,59,59,59,59,58,57,56,55,55,54,53,53,53,52,52,53,55,58,60,62,64,65,65,66,66,65,64,63,62,61,60,59,58,58,57,56,56,56,55,56,57,59,61,62,63,64,64,63,63,63,62,62,62,62,62,62,62,61,61,61,61,60,60,61,61,63,64,64,65,65,null,null,null,null,null],"c":[1,3,3,3,3,1,2,1,1,2,1,1,1,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,3,3,3,3,3,3,3,2,3,0,0,0,1,0,0,0,0,0,0,0,0,0,1,3,3,3,3,53,61,53,53,61,63,61,61,61,61,55,51,3,3,53,51,3,3,3,51,51,51,55,51,51,51,3,51,51,3,3,51,53,51,3,3,3,3,3,3,3,3,3,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,2,1,0,0,0,0,1,1,2,3,3,3,3,2,1,0,0,0,0,0,0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,53,53,53,80,80,80,80,80,80,2,1,0,0,0,0,0,0,1,1,2,2,2,1,1,1,0,0,0,0,1,1,2,3,3,2,2,2,2,2,1,1,1,1,2,2,1,1,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,53,53,53,55,55,55,53,53,53,53,53,53,80,80,80,51,51,51,3,3,3,3,3,3,3,2,2,1,1,1,0,0,0,0,1,45,2,3,3,3,3,3,51,51,51,61,61,61,61,61,61,80,80,80,53,53,53,53,53,53,53,53,53,51,51,51,53,53,53,51,51,51,53,53,53,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,3,3,3,null,null,null,null,null]},"Chicago":{"start":1790208000,"t":[61,61,61,61,59,58,57,57,57,57,57,58,58,59,61,61,62,62,63,64,64,65,65,64,63,63,63,63,63,63,61,60,59,58,57,57,56,58,58,59,61,63,63,63,63,63,63,63,63,63,63,63,62,62,61,61,60,60,59,58,58,60,62,64,65,66,67,68,68,68,66,65,63,62,62,62,61,61,60,60,59,59,59,59,58,60,63,65,67,68,69,69,67,66,66,65,63,63,63,63,62,62,62,62,61,61,60,60,60,62,65,68,70,71,72,72,71,70,69,67,66,65,65,65,64,64,63,63,62,62,61,60,61,63,67,70,72,74,74,74,73,71,70,68,67,65,63,63,63,65,66,66,67,67,65,62,59,57,56,55,54,53,53,54,55,56,57,57,57,58,59,59,58,57,55,55,54,54,53,52,53,54,57,60,63,65,67,69,70,70,68,66,65,64,63,62,61,61,60,59,59,58,58,57,57,59,62,65,68,70,72,73,74,73,72,70,68,67,66,65,64,63,62,61,61,61,60,59,59,60,63,65,66,68,69,69,68,67,66,64,62,61,61,61,60,59,58,58,58,58,58,57,57,57,58,58,58,58,57,56,54,53,52,52,52,53,53,53,53,53,53,52,52,53,53,53,53,53,54,55,55,55,55,56,57,57,56,55,54,54,54,53,53,52,51,51,50,49,49,48,48,50,53,55,58,61,63,64,64,63,62,61,59,59,58,57,57,56,55,54,54,53,52,51,51,53,56,58,60,63,65,65,66,66,65,63,62,61,60,59,58,58,57,57,56,56,55,55,56,57,58,59,61,63,65,66,67,68,68,68,67,68,68,67,66,65,64,63,61,60,59,58,58,59,61,62,64,65,66,null,null,null,null,null],"c":[3,3,3,3,1,1,0,1,0,2,1,3,1,1,3,1,0,0,0,0,1,0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,2,1,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,3,1,0,0,0,0,0,0,0,1,1,2,3,3,3,3,3,2,1,0,0,0,0,0,1,2,2,3,3,3,3,3,3,3,3,51,51,51,63,63,63,63,63,63,82,82,82,63,63,63,51,51,51,53,53,53,3,3,3,3,3,3,3,3,3,2,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,2,2,1,1,0,0,0,0,0,1,2,2,3,3,3,3,3,3,3,3,3,2,2,51,51,51,3,3,3,3,3,3,51,51,51,53,53,53,51,51,51,51,51,51,51,51,51,51,51,51,3,3,3,3,3,3,3,3,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,3,3,3,3,3,3,3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,51,51,51,2,1,1,0,0,0,0,0,0,0,0,0,null,null,null,null,null]},"Miami":{"start":1790208000,"t":[77,77,77,76,76,76,76,75,76,76,75,76,76,78,80,82,84,84,85,86,86,85,84,81,79,78,77,77,77,77,76,75,75,75,74,74,75,77,80,79,83,83,86,86,84,84,83,83,83,83,82,81,81,81,81,81,81,81,80,80,80,81,82,83,85,85,85,84,83,82,82,81,81,81,81,81,81,81,81,81,81,81,81,80,80,81,82,83,84,84,83,84,84,83,82,82,82,82,81,81,81,81,81,81,81,80,80,81,81,81,82,83,84,83,84,84,84,83,83,82,82,82,82,82,82,81,81,81,81,81,81,81,81,82,82,83,83,84,85,85,84,84,84,83,83,83,82,82,82,82,82,82,82,82,82,82,83,83,84,84,85,85,85,85,85,85,85,84,83,83,83,83,83,82,81,81,81,81,81,81,81,82,83,84,85,85,86,86,85,85,85,84,84,84,84,84,84,84,84,83,83,83,83,83,83,84,84,84,85,86,87,87,87,87,86,85,85,84,84,84,84,84,84,84,83,83,83,83,83,84,85,86,86,87,87,87,87,86,86,85,85,84,84,84,84,84,84,84,83,83,83,83,84,84,85,86,86,87,87,87,87,86,86,85,85,85,84,84,84,84,83,83,83,83,83,83,83,84,85,86,86,87,87,87,87,86,86,86,86,86,86,85,85,84,84,83,83,83,82,82,82,83,85,86,88,89,89,89,88,87,86,84,82,81,80,80,80,80,80,79,79,79,79,79,79,80,81,82,83,85,86,86,85,85,84,83,81,81,81,80,80,80,81,80,80,80,80,79,79,80,82,83,84,85,86,86,86,85,85,84,84,83,83,83,82,82,82,82,82,82,82,82,82,83,84,85,85,86,86,null,null,null,null,null],"c":[3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,1,0,3,1,1,3,0,0,0,0,0,0,2,0,2,1,0,0,0,0,0,2,1,3,81,2,82,2,2,51,55,53,51,51,0,0,1,2,51,51,3,3,2,1,0,3,0,0,0,0,0,0,51,51,53,53,51,51,0,1,51,51,51,51,51,51,51,51,51,51,0,1,1,2,3,3,3,3,51,51,51,51,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,51,3,3,3,3,3,3,3,3,2,1,1,1,1,2,3,3,3,3,3,51,51,51,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,51,51,51,3,3,3,53,53,53,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,95,95,80,55,55,55,51,51,51,53,53,53,2,3,3,51,51,51,3,3,3,3,3,3,51,51,51,51,51,51,51,51,51,3,3,3,51,51,51,51,51,51,51,51,51,51,95,95,95,95,95,51,51,51,51,51,51,2,3,3,3,2,2,2,3,3,51,51,51,51,51,51,51,51,51,51,51,51,3,3,3,3,3,3,51,51,51,3,3,3,51,51,51,51,51,51,51,51,51,3,3,3,3,3,3,3,3,3,3,3,3,51,51,51,51,51,51,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,51,51,51,95,95,95,51,51,51,51,51,51,55,55,55,55,55,55,3,3,3,55,95,95,95,95,55,53,53,53,53,53,53,1,0,0,51,51,51,0,0,0,51,51,51,0,0,0,51,51,51,53,53,53,51,51,51,53,53,53,0,0,0,0,0,0,0,0,0,0,0,0,null,null,null,null,null]},"Los Angeles":{"start":1790208000,"t":[78,74,71,70,69,69,69,69,67,66,65,64,63,64,65,65,66,70,73,78,82,84,82,79,75,72,69,68,68,67,66,65,65,65,65,65,65,65,64,65,69,74,80,86,88,90,90,88,86,82,80,80,79,79,79,78,77,77,76,76,76,75,75,76,78,81,84,87,90,91,90,87,86,85,83,81,79,78,77,77,76,76,75,74,74,74,73,74,76,79,81,85,87,88,86,84,82,79,78,77,77,76,75,74,74,73,73,72,72,72,72,73,75,78,81,83,86,87,86,83,81,80,79,79,78,77,77,77,76,76,76,76,77,77,78,79,82,86,89,92,95,96,94,91,88,87,86,85,84,83,82,82,81,81,80,80,79,79,78,78,80,82,84,85,86,86,84,82,81,79,77,76,76,75,75,75,75,75,74,74,73,73,73,73,76,79,81,83,85,86,85,83,81,79,78,76,76,75,75,74,74,73,73,72,72,72,72,73,74,77,80,83,85,87,85,83,80,78,75,74,74,74,74,73,72,71,70,70,69,69,69,69,71,74,77,79,81,83,83,83,82,80,77,75,74,74,73,73,73,73,72,72,72,73,73,75,77,81,84,86,89,90,90,89,87,86,85,84,82,81,80,79,79,79,78,77,77,77,77,78,80,83,86,89,91,92,91,88,86,85,84,83,82,81,80,79,78,78,77,76,75,75,75,75,77,80,83,85,87,88,86,83,81,79,78,77,76,76,76,75,74,73,72,72,71,71,71,72,74,77,80,82,84,85,84,82,80,79,78,78,78,78,78,78,78,78,78,78,78,78,78,79,82,86,89,92,95,97,97,95,93,92,91,90,89,89,88,88,86,86,85,84,83,83,83,84,87,91,94,null,null,null,null,null],"c":[0,0,0,1,1,2,3,2,1,0,0,0,1,3,45,45,45,3,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,45,45,45,45,45,45,45,45,3,3,0,0,0,3,3,1,1,3,3,1,2,1,2,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,2,1,1,1,1,1,1,0,0,1,2,2,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,3,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,null,null,null,null,null]},"London":{"start":1790208000,"t":[59,59,58,58,57,57,56,57,58,60,62,65,68,70,72,72,72,72,70,68,65,64,62,62,62,61,61,60,59,60,60,61,63,65,67,69,71,73,75,76,76,74,72,71,68,64,63,62,61,60,60,59,58,57,56,56,57,57,59,61,63,64,65,66,66,66,66,66,66,66,65,63,62,61,60,60,60,60,60,61,62,64,66,69,71,73,73,73,72,71,69,68,67,66,65,63,62,61,60,59,58,57,57,57,57,57,59,62,64,66,67,68,67,66,64,63,62,61,61,61,62,63,63,63,63,63,64,64,65,66,71,73,75,76,77,77,78,78,78,77,75,74,72,70,69,68,68,67,67,67,67,67,68,69,70,72,73,74,73,71,70,68,67,67,66,66,66,65,65,65,64,63,63,62,62,62,62,62,62,61,61,61,61,61,61,61,60,60,60,60,59,59,58,58,57,56,55,54,54,55,57,59,61,63,64,64,63,62,60,59,58,57,56,55,54,53,52,51,51,50,49,49,49,50,52,55,57,59,60,61,60,60,59,58,57,56,55,54,52,51,51,50,49,48,48,47,48,49,51,54,57,59,60,61,61,60,60,59,58,58,57,57,56,56,56,56,56,56,56,57,57,59,60,62,63,65,65,65,65,64,63,62,61,60,59,57,56,55,55,54,53,53,53,53,54,55,57,60,62,65,66,66,66,65,65,64,63,63,63,62,62,62,61,61,61,60,60,60,61,62,63,65,67,69,69,69,69,68,66,65,65,64,64,64,64,63,63,63,63,62,62,62,61,61,60,60,59,58,58,58,58,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"c":[3,2,2,3,3,3,3,1,0,0,0,0,0,3,0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,1,1,0,0,0,1,2,3,51,51,51,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,53,53,53,51,51,51,2,2,1,1,2,2,1,0,0,3,3,3,3,3,3,3,3,3,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,2,1,1,0,0,0,0,0,1,1,1,2,2,2,3,3,3,3,53,53,53,53,53,53,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,1,1,0,0,0,0,53,53,53,53,53,53,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,51,51,51,51,51,51,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,3,3,3,3,3,3,3,2,2,2,2,2,2,2,3,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,55,55,55,55,55,55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"Tokyo":{"start":1790208000,"t":[73,75,77,80,82,83,83,81,79,78,76,75,75,74,73,73,72,72,71,71,70,70,71,73,74,76,77,78,79,79,78,78,76,75,74,73,72,72,71,71,70,70,69,68,68,67,67,67,66,66,66,66,65,67,67,67,67,66,66,66,66,66,65,65,65,65,65,65,65,65,66,68,69,70,69,69,69,71,73,72,71,70,69,69,69,69,68,68,68,67,67,66,65,65,67,71,73,75,75,76,76,75,75,74,73,72,71,70,70,69,69,69,69,69,69,69,68,68,70,73,75,77,78,79,79,79,78,77,75,74,72,71,69,69,68,67,67,67,67,67,68,69,70,71,72,73,74,75,76,77,77,78,77,77,77,76,76,75,73,72,71,70,69,70,71,72,73,75,76,76,76,76,76,75,75,74,73,72,71,70,69,69,68,67,67,67,66,66,66,66,66,67,67,68,69,70,71,71,71,71,70,69,68,67,66,65,65,65,65,65,65,64,64,64,64,64,64,64,65,65,66,66,66,66,66,65,64,64,63,63,62,62,62,62,62,62,62,63,64,65,65,66,68,69,70,71,72,72,71,71,70,69,68,68,67,66,65,65,65,65,66,67,68,69,70,72,74,76,77,78,78,78,76,74,72,70,68,67,67,66,66,66,66,66,66,67,68,69,69,70,71,71,72,72,72,71,70,68,67,66,65,64,64,63,63,63,63,63,64,64,65,66,66,67,68,69,70,70,70,70,68,66,65,63,62,61,60,59,58,58,58,59,59,60,62,63,64,65,67,68,69,70,71,70,70,68,67,66,65,64,64,63,63,63,62,62,62,62,62,62,63,65,67,68,69,69,69,68,67,66,66,65,65,65,64,64,64,64,64,null,null,null,null,null],"c":[1,1,1,0,0,0,0,0,0,0,0,0,2,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,51,51,51,51,63,63,61,61,61,53,51,3,2,3,3,3,3,2,2,2,2,2,3,1,3,3,3,3,51,51,3,3,3,51,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,53,53,53,53,53,53,3,3,3,3,3,3,51,51,51,3,3,3,51,51,51,51,51,51,51,51,51,2,2,1,1,1,1,1,2,2,3,3,3,51,51,51,51,51,51,51,51,51,51,51,51,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,2,2,3,3,3,3,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,81,81,81,81,81,81,3,3,3,3,3,3,51,51,51,51,51,51,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,3,3,3,3,3,3,3,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,null,null,null,null,null]}};
const soloPick = list => list[Math.floor(Math.random() * list.length)];
// Built-in mood matcher, used when the AI isn't connected. A topic matches if the text has any `words`
// (and, if given, any `also` words too). Idea rows: [emoji, title, description, cost, duration, tags].
// Original poster art (hand-drawn SVG, inspired by each title's most famous image; not the studio artwork).
const soloSvg = (id, top, bottom, inner) => `<svg viewBox="0 0 340 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="340" height="240" fill="url(#${id})"/>${inner}</svg>`;
const soloDots = (n, seed, f) => Array.from({ length: n }, (_, i) => f((Math.sin(seed + i * 12.9898) * 43758.5453) % 1, (Math.sin(seed + i * 78.233) * 12345.678) % 1, i)).join('');
const soloAbs = x => Math.abs(x);
const SOLO_POSTERS = {
  'Past Lives': soloSvg('pl', '#1b1f4b', '#f3b88b', `<circle cx="252" cy="58" r="18" fill="#fde8c8" opacity=".9"/>
    <rect y="170" width="340" height="70" fill="#2a1f3d"/><line y1="170" x2="340" y2="170" stroke="#f3b88b" stroke-width="2" opacity=".6"/>
    <line x1="110" y1="150" x2="230" y2="150" stroke="#fde8c8" stroke-width="2" stroke-dasharray="3 8" opacity=".6"/>
    <g fill="#140f24"><circle cx="95" cy="126" r="8"/><rect x="87" y="135" width="16" height="35" rx="7"/><circle cx="245" cy="126" r="8"/><rect x="237" y="135" width="16" height="35" rx="7"/></g>`),
  'Up': soloSvg('up', '#6bbbee', '#dff3ff', `<g fill="#fff" opacity=".85"><ellipse cx="60" cy="190" rx="50" ry="14"/><ellipse cx="290" cy="200" rx="60" ry="16"/><ellipse cx="270" cy="40" rx="40" ry="10"/></g>
    ${soloDots(18, 3, (a, b, i) => `<line x1="170" y1="168" x2="${170 + a * 80}" y2="${78 + soloAbs(b) * 40}" stroke="#555" stroke-width=".6"/>`)}
    ${soloDots(18, 3, (a, b, i) => `<circle cx="${170 + a * 80}" cy="${78 + soloAbs(b) * 40}" r="${11 + (i % 3) * 3}" fill="${['#ff5d73', '#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#c77dff', '#ff9f1c'][i % 7]}"/>`)}
    <rect x="150" y="182" width="40" height="32" fill="#e9c46a"/><polygon points="144,184 170,164 196,184" fill="#c0504d"/><rect x="165" y="196" width="10" height="18" fill="#6d4c41"/><rect x="176" y="188" width="9" height="8" fill="#bde0fe"/>`),
  'Marley & Me': soloSvg('mm', '#f6d365', '#fda085', `<rect y="190" width="340" height="50" fill="#7cb342"/>
    <g fill="#5d3a1a" opacity=".85"><ellipse cx="160" cy="130" rx="34" ry="28"/><ellipse cx="118" cy="92" rx="12" ry="16"/><ellipse cx="146" cy="72" rx="12" ry="16"/><ellipse cx="176" cy="72" rx="12" ry="16"/><ellipse cx="204" cy="92" rx="12" ry="16"/></g>
    <circle cx="262" cy="176" r="20" fill="#d4e157"/><path d="M246 164 q16 12 0 26 M278 164 q-16 12 0 26" stroke="#fff" stroke-width="3" fill="none"/>`),
  'Eternal Sunshine of the Spotless Mind': soloSvg('es', '#0d1b2a', '#415a77', `${soloDots(30, 7, (a, b) => `<circle cx="${soloAbs(a) * 340}" cy="${soloAbs(b) * 110}" r="1.2" fill="#fff" opacity=".7"/>`)}
    <ellipse cx="170" cy="200" rx="240" ry="70" fill="#cfe3f0" opacity=".92"/>
    <path d="M40 190 l40 10 l30 -8 M200 215 l30 -12 l40 6 M120 225 l20 -10" stroke="#8fb3cc" stroke-width="1.5" fill="none"/>
    <g><rect x="130" y="176" width="36" height="10" rx="5" fill="#2b2d42"/><circle cx="126" cy="181" r="6" fill="#ff7b39"/><rect x="172" y="176" width="36" height="10" rx="5" fill="#3d405b"/><circle cx="212" cy="181" r="6" fill="#2b2d42"/></g>`),
  'The Notebook': soloSvg('nb', '#4a5d6e', '#9fb3c2', `<rect y="165" width="340" height="75" fill="#3b4f5f"/>
    ${soloDots(60, 11, (a, b) => `<line x1="${soloAbs(a) * 360}" y1="${soloAbs(b) * 240}" x2="${soloAbs(a) * 360 - 6}" y2="${soloAbs(b) * 240 + 16}" stroke="#dfe7ee" stroke-width="1" opacity=".45"/>`)}
    <path d="M130 172 q40 18 80 0 l-8 12 q-32 10 -64 0 z" fill="#6d4c41"/><circle cx="160" cy="162" r="5" fill="#222"/><circle cx="182" cy="162" r="5" fill="#222"/>
    <path d="M60 80 l8 6 l8 -6 M90 60 l7 5 l7 -5 M250 70 l8 6 l8 -6 M280 95 l6 5 l6 -5" stroke="#fff" stroke-width="2" fill="none"/>`),
  'Aftersun': soloSvg('as', '#00a8b5', '#7fe3e0', `<circle cx="270" cy="50" r="40" fill="#ffe08a" opacity=".35"/><circle cx="270" cy="50" r="22" fill="#ffe08a"/>
    ${[120, 150, 180, 210].map(y => `<path d="M0 ${y} q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>`).join('')}
    <g transform="rotate(-8 120 110)"><rect x="80" y="60" width="84" height="100" fill="#fff"/><rect x="88" y="68" width="68" height="68" fill="#2a9d8f"/><circle cx="122" cy="96" r="12" fill="#ffe08a"/></g>`),
  'Coco': soloSvg('co', '#1a0b3b', '#6a1b6e', `${soloDots(40, 5, (a, b, i) => `<circle cx="${soloAbs(a) * 340}" cy="${soloAbs(b) * 240}" r="${3 + (i % 3)}" fill="${i % 2 ? '#ff9f1c' : '#ffbf00'}" opacity=".9"/>`)}
    <g transform="rotate(-20 170 130)"><rect x="164" y="30" width="12" height="90" fill="#8d5524"/><rect x="160" y="20" width="20" height="16" rx="3" fill="#5d3a1a"/>
    <circle cx="170" cy="140" r="26" fill="#f5f0e6"/><circle cx="170" cy="180" r="32" fill="#f5f0e6"/><circle cx="170" cy="160" r="9" fill="#1a0b3b"/></g>`),
  'Little Women': soloSvg('lw', '#efe3d0', '#d8c3a5', `<rect y="200" width="340" height="40" fill="#c9b18f"/>
    ${['#7b4b3a', '#a0522d', '#5b6c5d', '#8e6c88'].map((c, i) => `<circle cx="${95 + i * 50}" cy="120" r="10" fill="${c}"/><polygon points="${95 + i * 50},130 ${75 + i * 50},200 ${115 + i * 50},200" fill="${c}"/>`).join('')}
    <path d="M280 40 q-30 40 -40 90 l4 2 q20 -50 36 -92" fill="#5b4636"/>`),
  'Paddington 2': soloSvg('pd', '#1f4e8c', '#4f86c6', `<ellipse cx="160" cy="130" rx="90" ry="20" fill="#d62828"/><path d="M110 130 q0 -70 50 -70 q50 0 50 70 z" fill="#d62828"/><rect x="112" y="112" width="96" height="10" fill="#9d0208"/>
    <rect x="240" y="150" width="46" height="56" rx="6" fill="#f4a261"/><rect x="236" y="140" width="54" height="14" rx="3" fill="#e9c46a"/><rect x="246" y="168" width="34" height="20" fill="#fff" opacity=".85"/>`),
  'The Princess Bride': soloSvg('pb', '#f8b195', '#6c5b7b', `<path d="M0 240 V190 h40 v-30 h14 v14 h14 v-14 h14 v30 h60 v-60 h14 v14 h14 v-14 h14 v60 h40 v-40 h14 v14 h14 v-14 h14 v40 h60 v50 z" fill="#2d1b3d"/>
    <g stroke="#e0e0e0" stroke-width="4" stroke-linecap="round"><line x1="120" y1="50" x2="220" y2="140"/><line x1="220" y1="50" x2="120" y2="140"/></g>
    <g stroke="#c9a227" stroke-width="6" stroke-linecap="round"><line x1="200" y1="128" x2="222" y2="116"/><line x1="140" y1="128" x2="118" y2="116"/></g>`),
  'Knives Out': soloSvg('ko', '#111', '#2b2b2b', `${Array.from({ length: 18 }, (_, i) => `<polygon points="166,30 174,30 170,82" fill="#cfd8dc" transform="rotate(${i * 20} 170 120)"/>`).join('')}
    <circle cx="170" cy="120" r="26" fill="none" stroke="#c9a227" stroke-width="5"/><circle cx="170" cy="120" r="8" fill="#8b0000"/>`),
  'Spirited Away': soloSvg('sa', '#0b3d4a', '#1c7c8c', `<rect y="170" width="340" height="70" fill="#0e5563"/>
    <rect x="120" y="100" width="100" height="70" fill="#b5332e"/><polygon points="108,104 170,70 232,104" fill="#5b1a17"/><rect x="140" y="60" width="60" height="20" fill="#b5332e"/><polygon points="132,62 170,40 208,62" fill="#5b1a17"/>
    ${soloDots(10, 2, (a, b, i) => `<circle cx="${130 + i * 9}" cy="${120 + (i % 2) * 22}" r="3" fill="#ffd166"/>`)}
    <g fill="#1d3557"><rect x="20" y="176" width="26" height="12" rx="2"/><rect x="50" y="176" width="26" height="12" rx="2"/><rect x="80" y="176" width="26" height="12" rx="2"/></g>
    <rect x="120" y="175" width="100" height="40" fill="#b5332e" opacity=".25"/>`),
  'Friends': soloSvg('fr', '#5b3a8e', '#3d2466', `<ellipse cx="170" cy="100" rx="70" ry="56" fill="none" stroke="#f2c14e" stroke-width="16"/>
    <ellipse cx="170" cy="100" rx="52" ry="40" fill="#2a1a4a"/><rect x="80" y="180" width="180" height="40" rx="14" fill="#d9713c"/><rect x="70" y="170" width="30" height="50" rx="12" fill="#c45f2c"/><rect x="240" y="170" width="30" height="50" rx="12" fill="#c45f2c"/>`),
  'The Office': soloSvg('of', '#d9dde3', '#aeb6bf', `<rect y="190" width="340" height="50" fill="#8d6e63"/>
    <rect x="110" y="110" width="120" height="80" rx="10" fill="#f7e463" opacity=".75"/><rect x="140" y="140" width="60" height="16" rx="4" fill="#37474f"/><rect x="140" y="134" width="56" height="8" rx="3" fill="#546e7a"/>
    <rect x="252" y="150" width="34" height="40" rx="4" fill="#fff"/><path d="M286 158 q14 0 14 12 q0 12 -14 12" stroke="#fff" stroke-width="5" fill="none"/>`),
  'Gilmore Girls': soloSvg('gg', '#f4a261', '#9c3d1c', `${soloDots(22, 9, (a, b, i) => `<ellipse cx="${soloAbs(a) * 340}" cy="${soloAbs(b) * 200}" rx="7" ry="4" fill="${['#e76f51', '#ffb703', '#bc4749'][i % 3]}" transform="rotate(${i * 37} ${soloAbs(a) * 340} ${soloAbs(b) * 200})"/>`)}
    <polygon points="110,110 160,110 152,200 118,200" fill="#fff"/><rect x="112" y="140" width="46" height="20" fill="#6d4c41"/>
    <polygon points="180,110 230,110 222,200 188,200" fill="#fff"/><rect x="182" y="140" width="46" height="20" fill="#6d4c41"/>`),
  'Avatar: The Last Airbender': soloSvg('av', '#0f2027', '#2c5364', `<circle cx="170" cy="50" r="24" fill="#f1e3a0"/><circle cx="110" cy="115" r="24" fill="#2a9d8f"/><circle cx="230" cy="115" r="24" fill="#e63946"/><circle cx="170" cy="180" r="24" fill="#6a994e"/>
    <path d="M170 90 l16 24 h-9 v22 h-14 v-22 h-9 z" fill="#4cc9f0"/>`),
};
const soloYT = q =>'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
const soloGoogle = q => 'https://www.google.com/search?q=' + encodeURIComponent(q);
const soloMaps = q => 'https://www.google.com/maps/search/' + encodeURIComponent(q);
const soloBook = q => 'https://www.goodreads.com/search?q=' + encodeURIComponent(q);
const SOLO_TOPICS = [
  { first: true, words: ['song', 'music', 'playlist', 'sing'], ideas: [
    ['🕺', 'Mr. Brightside', 'The Killers. Every word, full volume, no exceptions.', 'free', '4 min', ['song', 'anthem', '2003'], soloYT('Mr. Brightside The Killers'), '🎵 Listen'],
    ['👑', 'Dancing Queen', 'ABBA. Instantly seventeen, whatever your age.', 'free', '4 min', ['song', 'disco', '1976'], soloYT('Dancing Queen ABBA'), '🎵 Listen'],
    ['🌈', 'Hey Ya!', 'OutKast. Impossible to sit still through.', 'free', '4 min', ['song', 'feel-good', '2003'], soloYT('Hey Ya OutKast'), '🎵 Listen'],
    ['🇺🇸', 'Party in the U.S.A.', 'Miley Cyrus. Hands up, you know the rest.', 'free', '3 min', ['song', 'pop', '2009'], soloYT('Party in the USA Miley Cyrus'), '🎵 Listen'],
    ['🍂', 'September', 'Earth, Wind & Fire. The most joyful three and a half minutes ever recorded.', 'free', '4 min', ['song', 'funk', '1978'], soloYT('September Earth Wind and Fire'), '🎵 Listen'],
    ['⚡', 'Don\'t Stop Me Now', 'Queen. Pure, uncut joy with a piano.', 'free', '4 min', ['song', 'rock', '1978'], soloYT('Don\'t Stop Me Now Queen'), '🎵 Listen'],
    ['☂️', 'Umbrella', 'Rihanna. The chorus that owned an entire summer.', 'free', '4 min', ['song', 'pop', '2007'], soloYT('Umbrella Rihanna'), '🎵 Listen'],
    ['🎉', 'I Gotta Feeling', 'Black Eyed Peas. Basically the official song of going out.', 'free', '5 min', ['song', 'party', '2009'], soloYT('I Gotta Feeling Black Eyed Peas'), '🎵 Listen'],
    ['💌', 'Love Story', 'Taylor Swift. Romeo, Juliet, and a legendary key change.', 'free', '4 min', ['song', 'pop', '2008'], soloYT('Love Story Taylor Swift'), '🎵 Listen'],
    ['🔥', 'Crazy in Love', 'Beyoncé. Those horns. That\'s it, that\'s the review.', 'free', '4 min', ['song', 'r&b', '2003'], soloYT('Crazy in Love Beyonce'), '🎵 Listen'],
    ['🕶️', 'Yeah!', 'Usher. The intro alone can start a party.', 'free', '4 min', ['song', 'r&b', '2004'], soloYT('Yeah Usher'), '🎵 Listen'],
    ['🚗', 'Since U Been Gone', 'Kelly Clarkson. The ultimate windows-down singalong.', 'free', '4 min', ['song', 'pop', '2004'], soloYT('Since U Been Gone Kelly Clarkson'), '🎵 Listen'],
  ] },
  { first: true, words: ['danc', 'boogie', 'groove'], ideas: [
    ['🔁', 'The Cha Cha Slide', 'You already know every step. Now do it in your living room.', 'free', '5 min', ['dance', 'classic', 'at home'], soloYT('Cha Cha Slide dance'), '💃 Dance along'],
    ['🧟', 'Learn the "Thriller" dance', 'Michael Jackson\'s zombie choreography, one step at a time.', 'free', '45 min', ['dance', 'tutorial', 'at home'], soloYT('Thriller dance tutorial'), '💃 Dance along'],
    ['🎮', 'Just Dance at home', 'Pull up a Just Dance video and follow the neon dancer.', 'free', '30 min', ['dance', 'workout', 'at home'], soloYT('Just Dance full song'), '💃 Dance along'],
    ['📱', 'Learn a TikTok dance', 'Pick one trend and nail it before midnight.', 'free', '30 min', ['dance', 'tutorial', 'at home'], soloYT('easy TikTok dance tutorial'), '💃 Dance along'],
    ['🏠', 'Kitchen dance party', 'Lights low, speaker up, socks on the tile floor.', 'free', '30 min', ['dance', 'party', 'at home'], soloYT('2000s dance party playlist'), '🎵 Get the playlist'],
    ['💃', 'Drop-in salsa class', 'Beginner nights are everywhere, and you don\'t need a partner.', '$$', '1h', ['dance', 'class', 'out'], soloMaps('salsa dance class'), '📍 Find nearby'],
    ['🎷', 'Swing dance social', 'Most start with a free lesson. Twirling guaranteed.', '$', '2h', ['dance', 'social', 'out'], soloMaps('swing dance social'), '📍 Find nearby'],
    ['🤠', 'Line dancing night', 'Boots optional. Yeehaw mandatory.', '$', '2h', ['dance', 'country', 'out'], soloMaps('line dancing'), '📍 Find nearby'],
    ['🎧', 'Silent disco', 'Headphones on, pick a channel, dance like nobody can hear.', '$$', '2h', ['dance', 'party', 'out'], soloMaps('silent disco'), '📍 Find nearby'],
  ] },
  { first: true, words: ['cook', 'bak', 'recipe', 'hungry', 'dinner', 'kitchen'], ideas: [
    ['🍕', 'Homemade pizza', 'Stretch the dough, pile on toppings, argue about pineapple.', '$', '1.5h', ['cooking', 'at home'], soloGoogle('easy homemade pizza recipe'), '🍳 Get the recipe'],
    ['🍜', 'Pad Thai', 'Better than takeout, and done in 30 minutes.', '$', '30 min', ['cooking', 'at home'], soloGoogle('easy pad thai recipe'), '🍳 Get the recipe'],
    ['🍪', 'Brown butter cookies', 'Brown the butter first. Trust us.', '$', '45 min', ['baking', 'at home'], soloGoogle('brown butter chocolate chip cookies recipe'), '🍳 Get the recipe'],
    ['🥢', 'Glow-up instant ramen', 'Soft egg, scallions, chili oil. College food, but grown up.', '$', '15 min', ['cooking', 'at home'], soloGoogle('upgraded instant ramen recipe'), '🍳 Get the recipe'],
    ['🌮', 'Street tacos', 'Charred tortillas, quick-pickled onions, too much lime.', '$', '45 min', ['cooking', 'at home'], soloGoogle('street tacos recipe'), '🍳 Get the recipe'],
    ['🥞', 'Breakfast for dinner', 'Pancakes at 9pm just hit different.', '$', '30 min', ['cooking', 'at home'], soloGoogle('fluffy pancakes recipe'), '🍳 Get the recipe'],
    ['☕', '5-minute mug cake', 'Microwave, fork, done. Dessert emergency solved.', '$', '5 min', ['baking', 'at home'], soloGoogle('chocolate mug cake recipe'), '🍳 Get the recipe'],
    ['🍣', 'Roll your own sushi', 'Wobbly rolls, maximum fun. A bamboo mat helps.', '$$', '1.5h', ['cooking', 'at home'], soloGoogle('homemade sushi rolls for beginners'), '🍳 Get the recipe'],
  ] },
  { first: true, words: ['going out', 'go out', 'out tonight', 'near me', 'nearby', 'outside'], ideas: [
    ['⛳', 'Mini golf', 'Windmills, trash talk, and a hole-in-one you\'ll mention forever.', '$', '1h', ['going out', 'playful'], soloMaps('mini golf'), '📍 Find nearby'],
    ['🌃', 'Rooftop drinks', 'Same city, better view. Go right before sunset.', '$$', '2h', ['going out', 'views'], soloMaps('rooftop bar'), '📍 Find nearby'],
    ['🍳', 'Late-night diner run', 'Milkshakes and fries at 11pm. A timeless tradition.', '$', '1h', ['going out', 'food'], soloMaps('late night diner'), '📍 Find nearby'],
    ['🎳', 'Bowling', 'Cheesy shoes, loud music, and gutter balls.', '$$', '2h', ['going out', 'playful'], soloMaps('bowling alley'), '📍 Find nearby'],
    ['🎤', 'Karaoke', 'Pick the song you secretly know every word to.', '$', '2h', ['going out', 'music'], soloMaps('karaoke bar'), '📍 Find nearby'],
    ['😂', 'Comedy show', 'Open-mic nights are cheap, and occasionally legendary.', '$', '2h', ['going out', 'funny'], soloMaps('comedy club'), '📍 Find nearby'],
    ['🕹️', 'Arcade bar', 'Skee-ball and pinball. Winner picks the next spot.', '$', '2h', ['going out', 'games'], soloMaps('arcade bar'), '📍 Find nearby'],
    ['🍦', 'Ice cream walk', 'Get a cone, pick a direction, just wander.', '$', '45 min', ['going out', 'sweet'], soloMaps('ice cream'), '📍 Find nearby'],
  ] },
  { first: true, words: ['book', 'reading', 'novel'], ideas: [
    ['⚡', 'Harry Potter and the Sorcerer\'s Stone', 'The letter finally came. Reread it like it\'s the first time.', 'free', 'all night', ['book', 'fantasy', '1997'], soloBook('Harry Potter and the Sorcerer\'s Stone'), '📖 Look it up'],
    ['🏹', 'The Hunger Games', 'A girl, a bow, and a deadly reality show.', 'free', 'all night', ['book', 'dystopia', '2008'], soloBook('The Hunger Games'), '📖 Look it up'],
    ['🔱', 'Percy Jackson: The Lightning Thief', 'Your math teacher is a monster. Literally.', 'free', 'all night', ['book', 'adventure', '2005'], soloBook('The Lightning Thief'), '📖 Look it up'],
    ['🕳️', 'Holes', 'A cursed family, a dry lake, and a lot of digging.', 'free', '3h', ['book', 'classic', '1998'], soloBook('Holes Louis Sachar'), '📖 Look it up'],
    ['📓', 'Diary of a Wimpy Kid', 'It\'s a journal, not a diary. Still hilarious.', 'free', '1.5h', ['book', 'funny', '2007'], soloBook('Diary of a Wimpy Kid'), '📖 Look it up'],
    ['💐', 'The Perks of Being a Wallflower', 'Letters from a kid who feels everything.', 'free', '4h', ['book', 'coming-of-age', '1999'], soloBook('The Perks of Being a Wallflower'), '📖 Look it up'],
    ['🎩', 'A Series of Unfortunate Events', 'The narrator begs you not to read it. Read it.', 'free', '2h', ['book', 'mystery', '1999'], soloBook('The Bad Beginning'), '📖 Look it up'],
    ['🍎', 'The Giver', 'A perfect world with no color. Or is it perfect?', 'free', '3h', ['book', 'classic', '1993'], soloBook('The Giver Lois Lowry'), '📖 Look it up'],
  ] },
  { first: true, words: ['game', 'gaming', 'arcade', 'nostalg', 'coolmath', 'childhood', 'grew up', 'growing up', 'play online'], ideas: [
    ['🐍', 'Snake', 'Eat the apple. Don\'t eat yourself. Harder than it sounds.', 'free', '5 min', ['game', 'classic', '1997'], 'https://www.google.com/fbx?fbx=snake_arcade'],
    ['🔥', 'Fireboy and Watergirl', 'Two players, one keyboard, and a friendship tested by lava.', 'free', '30 min', ['game', '2-player', '2009'], 'https://www.coolmathgames.com/0-fireboy-and-water-girl-in-the-forest-temple'],
    ['🍕', 'Papa\'s Pizzeria', 'Take orders, top pies, and survive the pickiest customers on earth.', 'free', '30 min', ['game', 'coolmath', '2007'], 'https://www.coolmathgames.com/0-papas-pizzeria'],
    ['🐉', 'Neopets', 'Your pet has been waiting since middle school. Please feed it.', 'free', '30 min', ['game', 'nostalgia', '1999'], 'https://www.neopets.com/'],
    ['🏃', 'Run 3', 'A little alien, an endless tunnel in space. Just one more level.', 'free', '20 min', ['game', 'coolmath', '2014'], 'https://www.coolmathgames.com/0-run-3'],
    ['🧸', 'Webkinz', 'The stuffed animal with a login. Kinzville is still open.', 'free', '30 min', ['game', 'nostalgia', '2005'], 'https://www.webkinz.com/'],
    ['🦆', 'Duck Life', 'Train a duck. Win races. Save the farm. Peak childhood.', 'free', '30 min', ['game', 'coolmath', '2009'], 'https://www.coolmathgames.com/0-duck-life'],
    ['🏝️', 'Poptropica', 'Island-hopping adventures with that unmistakable big-headed avatar.', 'free', '45 min', ['game', 'nostalgia', '2007'], 'https://www.poptropica.com/'],
    ['🧱', 'Tetris', 'The original. Stack, clear, and hum the music for the rest of the night.', 'free', '15 min', ['game', 'classic', '1984'], 'https://tetris.com/play-tetris'],
    ['🏍️', 'Moto X3M', 'Stunt bikes, loops and explosions. Every flip shaves off time.', 'free', '20 min', ['game', 'coolmath', '2015'], 'https://www.coolmathgames.com/0-moto-x3m'],
    ['👻', 'Pac-Man', 'Google\'s playable Pac-Man doodle. Waka waka.', 'free', '10 min', ['game', 'classic', '1980'], 'https://www.google.com/logos/2010/pacman10-i.html'],
    ['🛷', 'Line Rider', 'Draw a line, watch a tiny sledder ride it. Make it a masterpiece.', 'free', '30 min', ['game', 'creative', '2006'], 'https://www.linerider.com/'],
    ['🟫', 'Bloxorz', 'Roll a block into a hole. Sounds easy. It is not.', 'free', '20 min', ['game', 'puzzle', '2007'], 'https://www.coolmathgames.com/0-bloxorz'],
    ['🍪', 'Cookie Clicker', 'Click the cookie. Hire grandmas. Question everything.', 'free', 'forever', ['game', 'idle', '2013'], 'https://orteil.dashnet.org/cookieclicker/'],
    ['💣', 'Minesweeper', 'The game on every family computer. Tonight you finally learn the rules.', 'free', '10 min', ['game', 'classic', '1990'], 'https://minesweeper.online/'],
    ['🏛️', 'Temple Run 2', 'Grab the idol and run. Don\'t look back.', 'free', '15 min', ['game', 'runner', '2013'], 'https://poki.com/en/g/temple-run-2'],
    ['🍬', 'Sugar, Sugar', 'Draw lines to pour sugar into cups. Strangely soothing.', 'free', '20 min', ['game', 'puzzle', '2009'], 'https://www.coolmathgames.com/0-sugar-sugar'],
    ['🐛', 'Slither.io', 'Snake, but against the whole internet. Get big or get eaten.', 'free', '15 min', ['game', 'multiplayer', '2016'], 'https://slither.io/'],
    ['🦖', 'Chrome Dino', 'The no-internet dinosaur, now on purpose.', 'free', '5 min', ['game', 'classic', '2014'], 'https://chromedino.com/'],
    ['🛹', 'Subway Surfers', 'Dodge trains, grab coins, outrun the inspector.', 'free', '15 min', ['game', 'runner', '2012'], 'https://poki.com/en/g/subway-surfers'],
    ['🟢', 'Agar.io', 'You\'re a cell. Eat the small ones. Flee the big ones.', 'free', '15 min', ['game', 'multiplayer', '2015'], 'https://agar.io/'],
    ['🔢', '2048', 'Slide the tiles, merge the numbers, lose an hour.', 'free', '15 min', ['game', 'puzzle', '2014'], 'https://play2048.co/'],
    ['🃏', 'Solitaire', 'The office classic, playable right in Google.', 'free', '10 min', ['game', 'cards', '1990'], 'https://www.google.com/search?q=solitaire'],
  ] },
  { words: ['sad', 'cry', 'lonely', 'heartbr', 'tear', 'down', 'blue', 'miss'], also: ['movie', 'film', 'watch', 'netflix'], ideas: [
    ['🌙', 'Past Lives', 'Two childhood sweethearts. Twenty-four years. One impossible what-if.', '$', '1h 45m', ['movie', 'tearjerker', '2023']],
    ['🎈', 'Up', 'A widower, a stowaway and ten thousand balloons. You\'ll cry by minute ten.', '$', '1h 36m', ['movie', 'animated', '2009']],
    ['🐕', 'Marley & Me', 'The worst dog in the world. The best life. Bring tissues.', '$', '2h', ['movie', 'tearjerker', '2008']],
    ['🧠', 'Eternal Sunshine of the Spotless Mind', 'They erased each other. Their hearts never got the memo.', '$', '1h 48m', ['movie', 'romance', '2004']],
    ['🌧️', 'The Notebook', 'One summer, one rainstorm, one love that refuses to quit.', '$', '2h 3m', ['movie', 'romance', '2004']],
    ['🌊', 'Aftersun', 'A holiday with Dad, understood twenty years too late.', '$', '1h 42m', ['movie', 'tearjerker', '2022']],
    ['🎸', 'Coco', 'A boy, a guitar, and the family waiting on the other side.', '$', '1h 45m', ['movie', 'animated', '2017']],
    ['✒️', 'Little Women', 'Four sisters, one house, a lifetime of growing up and apart.', '$', '2h 15m', ['movie', 'drama', '2019']],
  ] },
  { first: true, words: ['tv', 'series', 'binge', 'sitcom', 'show'], ideas: [
    ['☕', 'Friends', 'Six friends, one orange couch, and a coffee shop with suspiciously available seating.', '$', '22 min/ep', ['tv', 'sitcom', '1994']],
    ['📎', 'The Office', 'A paper company, a terrible boss, and a stapler in Jell-O.', '$', '22 min/ep', ['tv', 'sitcom', '2005']],
    ['🍂', 'Gilmore Girls', 'Fast talk, endless coffee, and the coziest small town on TV.', '$', '44 min/ep', ['tv', 'comfort', '2000']],
    ['🌀', 'Avatar: The Last Airbender', 'Four nations, one kid with an arrow tattoo. Honestly one of the best shows ever made.', '$', '23 min/ep', ['tv', 'animated', '2005']],
  ] },
  { first: true, words: ['movie', 'film', 'watch', 'netflix'], ideas: [
    ['🐻', 'Paddington 2', 'A bear goes to prison and somehow makes it the kindest place on earth.', '$', '1h 44m', ['movie', 'comfort', '2017']],
    ['🗡️', 'The Princess Bride', 'Fencing. Giants. True love. Miracles. As you wish.', '$', '1h 38m', ['movie', 'classic', '1987']],
    ['🔪', 'Knives Out', 'A dead novelist, a greedy family, and a detective with a drawl.', '$', '2h 10m', ['movie', 'mystery', '2019']],
    ['🐉', 'Spirited Away', 'A lost girl, a bathhouse for spirits, and a name she must not forget.', '$', '2h 5m', ['movie', 'animated', '2001']],
    ['🍿', 'Build a movie-night nest', 'Blankets, pillows, popcorn, lights off. Pick a movie you loved as a kid.', 'free', '2h', ['cozy', 'night in']],
  ] },
  { words: ['lonely', 'alone', 'isolated', 'miss', 'nobody', 'no one'], ideas: [
    ['📞', 'Call someone you miss', 'Pick one person you haven\'t talked to in months and just call. They\'ll be glad you did.', 'free', '30m', ['connection']],
    ['☕', 'Bring a book to a busy café', 'Being around people helps, even if you don\'t talk to anyone.', '$', '1h', ['cozy', 'out']],
    ['🧠', 'Go to a trivia night alone', 'Teams love an extra player. Ask to join one; it\'s an easy way to meet people.', '$', '2h', ['social']],
    ['💌', 'Write a letter to a friend', 'A real paper letter. It feels good to write and even better to get.', 'free', '30m', ['connection']],
    ['🐶', 'Volunteer at an animal shelter', 'Many shelters have evening shifts. Dogs are excellent company.', 'free', '2h', ['kind']],
  ] },
  { words: ['sad', 'cry', 'down', 'blue', 'upset', 'heartbr', 'bad day'], ideas: [
    ['🛁', 'Take a long, hot bath', 'Music on, phone away. Let yourself do nothing for a while.', 'free', '45m', ['self-care']],
    ['🍝', 'Make your favorite comfort food', 'Whatever makes you feel looked after. Extra cheese allowed.', '$', '1h', ['comfort']],
    ['🎧', 'Make a "cry it out" playlist', 'Sad songs, then slowly switch to happy ones. It really helps.', 'free', '30m', ['music']],
    ['🚶', 'Take a slow walk outside', 'Fresh air and moving your body shift your mood more than you\'d think.', 'free', '30m', ['outdoors']],
  ] },
  { words: ['happy', 'great', 'excited', 'good', 'celebrat', 'amazing'], ideas: [
    ['💃', 'Throw a solo dance party', 'Loud music, kitchen floor, no one watching. Go wild.', 'free', '30m', ['energy']],
    ['🎤', 'Go to karaoke', 'Pick the song you secretly know every word to.', '$', '2h', ['social', 'fun']],
    ['🍦', 'Go on a dessert crawl', 'Three dessert spots, one bite each. Rate them.', '$$', '2h', ['food']],
    ['🌅', 'Have a sunset picnic', 'Grab snacks and a blanket and find a view.', '$', '1.5h', ['outdoors']],
  ] },
  { words: ['tired', 'sleepy', 'exhausted', 'lazy', 'drained', 'chill', 'relax'], ideas: [
    ['🧖', 'Do a face mask and a show', 'Minimum effort, maximum comfort.', '$', '1h', ['self-care']],
    ['📚', 'Read in bed and sleep early', 'Tomorrow-you will be so grateful.', 'free', '1h', ['rest']],
    ['🥡', 'Order your favorite takeout', 'No cooking, no dishes. You earned it.', '$$', '1h', ['food', 'cozy']],
  ] },
  { words: ['social', 'friends', 'people', 'party', 'meet', 'hang', 'group'], ideas: [
    ['🎲', 'Host a board game night', 'Text three friends, grab snacks, pick a game everyone knows.', '$', '3h', ['friends']],
    ['🎳', 'Go bowling', 'Cheesy shoes, loud music, bad scores. Always fun.', '$$', '2h', ['friends', 'active']],
    ['🧠', 'Find a trivia night', 'Bars all over town have trivia on weeknights. Name your team something ridiculous.', '$', '2h', ['social']],
  ] },
  { words: ['wired', 'energy', 'energetic', 'restless', 'hyper', 'active', 'bored'], ideas: [
    ['🧗', 'Try a climbing gym', 'Most have day passes and rental shoes. You\'ll be tired in the best way.', '$$', '2h', ['active']],
    ['🕹️', 'Hit an arcade', 'Skee-ball, air hockey, claw machines. Burn it all off.', '$', '2h', ['fun']],
    ['🏃', 'Go for a night run', 'City lights, cool air, your favorite playlist.', 'free', '45m', ['active']],
  ] },
  { words: ['broke', 'cheap', 'free', 'money', 'budget', 'poor'], ideas: [
    ['🏛️', 'Find a free museum night', 'Lots of museums have a free evening each week. Look up yours.', 'free', '2h', ['culture']],
    ['🍲', 'Host a potluck', 'Everyone brings one dish. A feast for the price of one meal.', '$', '3h', ['friends', 'food']],
    ['📚', 'Explore the library', 'Free books, movies, and sometimes free events and classes.', 'free', '1h', ['quiet']],
  ] },
  { words: ['adventur', 'new', 'different', 'spontan', 'explore', 'wild'], ideas: [
    ['🗺️', 'Explore a new neighborhood', 'Pick one you\'ve never walked around. Eat at the first place that smells good.', '$', '2h', ['explore']],
    ['🎙️', 'Go to an open mic', 'Watch, or sign up if you\'re brave. Either way it\'s a story.', 'free', '2h', ['culture']],
    ['🌮', 'Try a cuisine you\'ve never had', 'Point at the menu and trust the process.', '$$', '1.5h', ['food']],
  ] },
  { words: ['romantic', 'date', 'love', 'crush', 'partner', 'boyfriend', 'girlfriend'], ideas: [
    ['✨', 'Go stargazing', 'Drive away from the city lights with a blanket and hot drinks.', 'free', '2h', ['romantic']],
    ['🕯️', 'Cook a candlelit dinner at home', 'Cook something together, dim the lights, play music.', '$', '2h', ['romantic']],
    ['🍰', 'Do a dessert date', 'Skip dinner and just split three desserts.', '$$', '1.5h', ['romantic', 'food']],
  ] },
  { words: ['cozy', 'comfy', 'home', 'stay in', 'cold', 'rain'], ideas: [
    ['🏰', 'Build a blanket fort', 'Fairy lights, pillows, snacks. You are never too old.', 'free', '1h', ['cozy']],
    ['🍪', 'Bake cookies', 'The house smells amazing, and then you have cookies.', '$', '1h', ['cozy', 'food']],
    ['🧩', 'Do a puzzle with hot cocoa', 'Slow, calm, and very satisfying.', '$', '2h', ['cozy']],
  ] },
  { words: ['stress', 'anxious', 'anxiety', 'overwhelm', 'worried', 'nervous'], ideas: [
    ['🧘', 'Try a 20-minute yoga video', 'Free on YouTube. Slow breathing, gentle stretches.', 'free', '20m', ['calm']],
    ['📝', 'Brain-dump in a journal', 'Write down everything on your mind. Then close the notebook.', 'free', '20m', ['calm']],
    ['🌳', 'Walk somewhere green', 'A park, a tree-lined street, anywhere with nature.', 'free', '30m', ['outdoors', 'calm']],
  ] },
];
const soloMatch = text => {
  const t = text.toLowerCase(), has = list => list.filter(w => t.includes(w)).length;
  const hits = SOLO_TOPICS.map(topic => ({ topic, score: has(topic.words) * (topic.also ? (has(topic.also) ? 3 : 0) : 1) }))
    .filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  // Specific asks (like "sad movie") go first, then activities, then feelings. Within a tier, topics take turns.
  const turns = lists => Array.from({ length: Math.max(0, ...lists.map(l => l.length)) }, (_, r) => lists.map(l => l[r]).filter(Boolean)).flat();
  const mixed = [...hits.filter(x => x.topic.also).flatMap(x => x.topic.ideas),
    ...turns(hits.filter(x => x.topic.first).map(x => x.topic.ideas)),
    ...turns(hits.filter(x => !x.topic.also && !x.topic.first).map(x => x.topic.ideas))];
  return soloIdeas(mixed);
};
const soloIdeas = rows => rows.filter((i, n, all) => all.findIndex(j => j[1] === i[1]) === n)
  .map(([emoji, title, description, cost, duration, tags, link, linkLabel]) => ({ emoji, title, description, cost, duration, tags, vibe: tags[0], mode: 'solo', link, linkLabel }));
// Budget / time filters. Durations like "1h 45m", "30 min", "all night" -> minutes.
const soloCost = c => ({ free: 0, $: 1, $$: 2, $$$: 3 })[c] ?? 1;
const soloMinutes = d => /all night|forever/i.test(d || '') ? 999
  : ((+((d || '').match(/([\d.]+)\s*h/) || [])[1] || 0) * 60) + (+((d || '').match(/(\d+)\s*m/) || [])[1] || 0) || 60;
const SOLO_FILTERS = {
  who: { label: 'Who', icon: '👥', options: [['🙋', 'just me'], ['💕', 'date'], ['👯', 'friends'], ['👨‍👩‍👧', 'family']] },
  budget: { label: 'Budget', icon: '💰', options: [['🆓', 'free'], ['💵', '$'], ['💵', '$$'], ['💎', '$$$']] },
  time: { label: 'Time', icon: '⏰', options: [['⚡', 'quick'], ['🕐', 'couple hours'], ['🌙', 'all night']] },
};
const soloFilter = (ideas, { budget, time }) => ideas.filter(i =>
  (!budget || soloCost(i.cost) <= soloCost(budget)) &&
  (!time || time === 'all night' || soloMinutes(i.duration) <= (time === 'quick' ? 30 : 150)));
const SOLO_ACTIVITIES = [['🎮', 'games'], ['🎬', 'movies & tv'], ['🎵', 'songs'], ['💃', 'dancing'], ['🍳', 'cooking'], ['📍', 'going out'], ['📚', 'books']];
const SOLO_MOODS = [['😄', 'happy'], ['😢', 'sad'], ['😴', 'tired'], ['🥳', 'social'], ['⚡', 'wired'], ['💸', 'broke'],
  ['🧭', 'adventurous'], ['💕', 'romantic'], ['🛋️', 'cozy'], ['😤', 'stressed']];

const soloTitle = i => String(i.title || '').replace(/^watch\s+/i, '').replace(/^"(.*)"$/, '$1');
const soloBg = title => {
  const hue = [...title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 17);
  return `background: radial-gradient(circle at 30% 20%, hsl(${hue} 80% 62%), hsl(${(hue + 50) % 360} 60% 30%) 60%, #14152c)`;
};
// Play link for games, "where to watch" for movies, nothing otherwise.
const soloWatch = i => /^https:\/\//.test(i.link || '') ? `<a class="solo-watch" target="_blank" rel="noopener" href="${ui.esc(i.link)}">${ui.esc(i.linkLabel || '🎮 Play now')}</a>`
  : (i.tags || []).some(t => /^(movie|film|tv)$/i.test(t)) ? `<a class="solo-watch" target="_blank" rel="noopener" href="https://www.justwatch.com/us/search?q=${encodeURIComponent(soloTitle(i))}">▶ Where to watch</a>` : '';

const soloStyle = document.createElement('style');
soloStyle.textContent = `
  .solo-fun { margin-top: 36px; }
  .solo-fun h2 { font-size: 18px; color: var(--mute); margin: 0 0 12px; font-weight: 600; }
  .solo-fun-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; }
  .solo-fun .card { padding: 16px; }
  .solo-fun .label { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--mute); margin-bottom: 8px; }
  .solo-fun .body { line-height: 1.45; }
  .solo-fun .word { font-size: 22px; font-weight: 800; background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  .solo-fun .muted { color: var(--mute); font-size: 14px; margin-top: 6px; }
  .solo-fun .temp { font-size: 28px; font-weight: 800; }
  .solo-fun .clicky { cursor: pointer; user-select: none; transition: transform .15s, border-color .15s; }
  .solo-fun .clicky:hover { border-color: var(--accent2); transform: translateY(-2px); }
  .solo-mood { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 18px; margin-bottom: 18px; }
  .solo-mood h2 { margin: 0 0 12px; font-size: 22px; }
  .solo-mood form { display: flex; gap: 10px; margin-bottom: 12px; }
  .solo-mood input { flex: 1; font-size: 17px; padding: 12px 16px; border-radius: 999px; }
  .solo-mood input:focus { outline: none; border-color: var(--accent2); }
  .solo-mood .chip { font-size: 14px; padding: 6px 14px; }
  .solo-mood .chip:hover { border-color: var(--accent2); }
  .solo-mood form { margin: 14px 0 0; }
  .solo-dds { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .solo-dd { position: relative; }
  .solo-ddbtn { font: inherit; font-size: 15px; background: #0f1024; color: var(--ink); border: 1px solid var(--line); border-radius: 999px;
    padding: 9px 16px; cursor: pointer; transition: border-color .2s, background .2s; }
  .solo-ddbtn:hover, .solo-dd.open .solo-ddbtn { border-color: var(--accent2); }
  .solo-dd.picked .solo-ddbtn { background: linear-gradient(135deg, #ff8a5c33, #c86bfa33); border-color: var(--accent2); }
  .solo-ddmenu { display: none; position: absolute; top: calc(100% + 8px); left: 0; z-index: 40; width: 280px; padding: 12px;
    background: var(--panel); border: 1px solid var(--line); border-radius: 16px; box-shadow: 0 20px 50px #000a; }
  .solo-dd.open .solo-ddmenu { display: block; animation: solo-pop .2s ease; }
  .solo-ddnote { font-size: 12px; color: var(--mute); margin-bottom: 8px; }
  .solo-clear { font: inherit; font-size: 13px; background: none; border: 0; color: var(--mute); cursor: pointer; text-decoration: underline; }
  .solo-for { color: var(--mute); margin: 18px 0 0; }
  .solo-wheel { position: relative; height: 580px; perspective: 1400px; overflow: hidden; touch-action: pan-y; user-select: none; margin-top: 6px; }
  .solo-card { position: absolute; left: 50%; top: 14px; width: 340px; background: #14152c; border: 1px solid var(--line); border-radius: 22px;
    height: 540px; display: flex; flex-direction: column;
    overflow: hidden; box-shadow: 0 30px 70px #0009; cursor: pointer; transition: transform .6s cubic-bezier(.2,.8,.2,1), opacity .45s, filter .45s; }
  .solo-card:not(.on) { filter: brightness(.6); }
  .solo-card.on { cursor: pointer; border-color: #ffffff2a; }
  .solo-card.on:hover { border-color: var(--accent2); box-shadow: 0 30px 70px #0009, 0 0 0 1px var(--accent2), 0 0 40px #c86bfa44; }
  .solo-poster { height: 200px; flex: none; display: grid; place-items: center; font-size: 104px; position: relative; }
  .solo-poster::after { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 50%, #14152c); }
  .solo-poster span { filter: drop-shadow(0 12px 24px #0007); z-index: 1; }
  .solo-poster.art { height: 200px; display: block; }
  .solo-poster.art svg { width: 100%; height: 100%; display: block; }
  .solo-poster.art::after { background: linear-gradient(transparent 70%, #14152c); }
  .solo-cbody { padding: 0 26px 22px; position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; }
  .solo-clamp { display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
  .solo-kicker { font-size: 11px; letter-spacing: .24em; text-transform: uppercase; color: var(--mute); margin-bottom: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: none; }
  .solo-ctitle { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size: 30px; line-height: 1.08; margin: 0 0 10px; -webkit-line-clamp: 3; flex: none; font-weight: 600; letter-spacing: -.01em; }
  .solo-cdesc { font-family: Georgia, serif; font-style: italic; font-size: 16px; line-height: 1.45; color: #d9d6f2; margin: 0 0 12px; -webkit-line-clamp: 4; }
  .solo-meta { font-size: 13px; color: var(--mute); margin: auto 0 14px; letter-spacing: .04em; flex: none; }
  .solo-actions { display: flex; gap: 8px; flex-wrap: nowrap; flex: none; }
  .solo-actions a, .solo-actions button { font: inherit; font-size: 14px; font-weight: 700; padding: 9px 14px; border-radius: 999px; cursor: pointer; text-decoration: none; white-space: nowrap; }
  .solo-actions .solo-more { background: transparent; color: var(--mute); border: 0; margin-left: auto; padding: 9px 2px; }
  .solo-card.on .solo-more { color: var(--ink); } .solo-more:hover { color: var(--accent) !important; }
  .solo-watch { background: var(--ink); color: var(--bg); border: 0; }
  .solo-love { background: transparent; color: var(--ink); border: 1px solid #ffffff40; }
  .solo-love:hover { border-color: var(--accent); }
  .solo-arrow { position: absolute; top: 45%; z-index: 30; width: 48px; height: 48px; border-radius: 50%; background: #0f1024cc; border: 1px solid var(--line);
    color: var(--ink); font-size: 26px; line-height: 1; cursor: pointer; backdrop-filter: blur(6px); }
  .solo-arrow:hover { border-color: var(--accent2); } .solo-prev { left: 10px; } .solo-next { right: 10px; }
  .solo-dots { display: flex; justify-content: center; gap: 8px; }
  .solo-dots button { width: 8px; height: 8px; border-radius: 4px; border: 0; padding: 0; background: var(--line); cursor: pointer; transition: all .3s; }
  .solo-dots button.on { width: 24px; background: var(--accent); }
  .solo-hint { text-align: center; color: var(--mute); font-size: 13px; margin-top: 10px; }
  .solo-modal { position: fixed; inset: 0; z-index: 8; background: #07081acc; backdrop-filter: blur(8px); display: grid; place-items: center; padding: 24px;
    animation: solo-fade .2s ease-out; }
  .solo-sheet { width: min(860px, 100%); max-height: calc(100vh - 48px); overflow: auto; background: #14152c; border: 1px solid #ffffff2a; border-radius: 26px;
    box-shadow: 0 40px 120px #000c; position: relative; animation: solo-rise .45s cubic-bezier(.2,1.3,.4,1); }
  .solo-hero { display: flex; align-items: flex-end; gap: 22px; padding: 34px 34px 26px; position: relative; }
  .solo-hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 40%, #14152c); pointer-events: none; }
  .solo-hero > * { position: relative; z-index: 1; }
  .solo-hemoji { font-size: 96px; line-height: 1; filter: drop-shadow(0 12px 24px #0008); animation: solo-wobble 3s ease-in-out infinite; }
  .solo-hero .solo-ctitle { font-size: 40px; margin: 6px 0 0; }
  .solo-x { position: absolute; top: 14px; right: 14px; z-index: 2; width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ffffff30;
    background: #0f1024aa; color: var(--ink); font-size: 20px; cursor: pointer; } .solo-x:hover { border-color: var(--accent); transform: rotate(90deg); transition: transform .2s; }
  .solo-mbody { padding: 0 34px 32px; }
  .solo-mbody .solo-cdesc { font-size: 19px; }
  .solo-facts { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 18px; }
  .solo-facts span { background: #ffffff12; border-radius: 999px; padding: 6px 12px; font-size: 14px; }
  .solo-mbody .solo-actions { flex-wrap: wrap; margin-bottom: 24px; }
  .solo-summary { font-size: 16px; line-height: 1.5; color: #d9d6f2; margin: 0 0 18px; }
  .solo-secs { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
  .solo-sec { background: #ffffff08; border: 1px solid var(--line); border-radius: 18px; padding: 16px 18px; animation: solo-pop .35s ease backwards; }
  .solo-sec h4 { margin: 0 0 10px; font-size: 15px; text-transform: uppercase; letter-spacing: .08em; }
  .solo-sec ul, .solo-sec ol { margin: 0; padding-left: 20px; line-height: 1.5; } .solo-sec li { margin-bottom: 4px; }
  .solo-sec ol li::marker { color: var(--accent); font-weight: 800; }
  .solo-note { color: var(--mute); font-size: 14px; margin-top: 14px; }
  @keyframes solo-fade { from { opacity: 0; } }
  @keyframes solo-rise { from { opacity: 0; transform: translateY(40px) scale(.94); } }
  @keyframes solo-wobble { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg) scale(1.05); } }
  .solo-pop { animation: solo-pop .35s ease; }
  @keyframes solo-pop { 0% { transform: scale(.94); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`;
document.head.appendChild(soloStyle);

registerFeature({
  id: 'solo', label: 'Spark', icon: '✨',
  render(view) {
    view.innerHTML = `<section class="page"><h1>What could I do tonight?</h1>
      <p class="sub">Ideas tailored to your profile (${Object.keys(app.profile).length ? 'loaded' : 'fill in Profile for better ideas'}).</p>
      <div class="solo-mood"><h2>What's the vibe tonight?</h2>
        <div class="solo-dds">${[
          ['feeling', '😊', 'Feeling', SOLO_MOODS, true], ['activity', '🎯', 'Activity', SOLO_ACTIVITIES, true],
          ...Object.entries(SOLO_FILTERS).map(([k, f]) => [k, f.icon, f.label, f.options, false]),
        ].map(([key, icon, label, opts, multi]) => `<div class="solo-dd" data-key="${key}" data-label="${icon} ${label}" ${multi ? 'data-multi' : ''}>
          <button class="solo-ddbtn" type="button">${icon} ${label} ▾</button>
          <div class="solo-ddmenu">${multi ? '<div class="solo-ddnote">Pick as many as you like</div>' : ''}
            ${opts.map(([e, v]) => `<button class="chip" type="button" data-v="${v}">${e} ${v}</button>`).join('')}</div></div>`).join('')}
          <button class="solo-clear" type="button" id="clear">Clear all</button></div>
        <form id="moodForm"><input id="mood" autocomplete="off" placeholder="Or type anything: want to play online games, need a hug…">
          <button class="btn" type="submit" id="find">Find ideas ✨</button></form>
      </div>
      <div class="row"><button class="btn ghost" id="go">Just give me ideas</button><button class="btn ghost" id="wild">🎲 Surprise me</button></div>
      <p class="solo-for" id="for"></p>
      <div id="out"></div>
      <div class="solo-fun"><h2>🎉 While you decide…</h2><div class="solo-fun-grid">
        <div class="card clicky" id="joke" title="Click for another joke"></div>
        <div class="card clicky" id="word" title="Click for another word"></div>
        <div class="card clicky" id="weather" title="Click for another city"></div>
        <div class="card clicky" id="fact" title="Click for another fact"></div>
      </div></div></section>`;
    const out = view.querySelector('#out');

    // Fun corner: every card shows something new when clicked. Word starts with today's word; weather is live.
    const refresh = (el, html) => { el.innerHTML = html; el.classList.remove('solo-pop'); void el.offsetWidth; el.classList.add('solo-pop'); };
    const more = what => `<div class="muted">click for another ${what}</div>`;
    const joke = view.querySelector('#joke'), fact = view.querySelector('#fact'), word = view.querySelector('#word'), weather = view.querySelector('#weather');
    const showJoke = () => refresh(joke, `<div class="label">😂 Joke</div><div class="body">${ui.esc(soloPick(SOLO_JOKES))}</div>${more('joke')}`);
    const showFact = () => refresh(fact, `<div class="label">🤯 Fun fact</div><div class="body">${ui.esc(soloPick(SOLO_FACTS))}</div>${more('fact')}`);
    let wordN = Math.floor(Date.now() / 864e5) % SOLO_WORDS.length;
    const showWord = () => {
      const [w, meaning, use] = SOLO_WORDS[wordN++ % SOLO_WORDS.length];
      refresh(word, `<div class="label">📚 Word of the day</div><div class="word">${w}</div>
        <div class="body">${ui.esc(meaning)}</div><div class="muted">"${ui.esc(use)}"</div>${more('word')}`);
    };
    const cities = [...new Set([app.profile.city, 'Boston', 'New York', 'Chicago', 'Miami', 'Los Angeles', 'London', 'Tokyo'].filter(Boolean))];
    let cityN = 0;
    const showWeather = async () => {
      const city = cities[cityN++ % cities.length];
      refresh(weather, `<div class="label">🌤️ Weather in ${ui.esc(city)}</div><div class="muted">Checking the sky…</div>`);
      try {
        const geo = await (await fetch(`https://geocoding-api.open-meteo.com/v1/search?count=1&name=${encodeURIComponent(city)}`)).json();
        const place = geo.results[0];
        const wx = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`)).json();
        const t = Math.round(wx.current.temperature_2m), c = wx.current.weather_code, [emoji, words] = soloWeather(c);
        refresh(weather, `<div class="label">${emoji} Weather in ${ui.esc(place.name)}</div><div class="temp">${t}°F</div>
          <div class="body">${words}</div><div class="muted">${soloWeatherTip(t, c)}</div>${more('city')}`);
      } catch {
        // Live weather blocked: read this hour from the stored forecast.
        const name = Object.keys(SOLO_FORECAST).find(k => city.toLowerCase().includes(k.toLowerCase()));
        const fc = SOLO_FORECAST[name], h =fc && Math.floor((Date.now() / 1000 - fc.start) / 3600);
        if (fc && h >= 0 && fc.t[h] != null) {
          const t = fc.t[h], c = fc.c[h], [emoji, words] = soloWeather(c);
          refresh(weather, `<div class="label">${emoji} Weather in ${ui.esc(city)}</div><div class="temp">${t}°F</div>
            <div class="body">${words}</div><div class="muted">${soloWeatherTip(t, c)}</div>${more('city')}`);
        } else refresh(weather, `<div class="label">🌤️ Weather in ${ui.esc(city)}</div><div class="body">No forecast for this city yet. Look out the window? 🪟</div>${more('city')}`);
      }
    };
    joke.onclick = showJoke; fact.onclick = showFact; word.onclick = showWord; weather.onclick = showWeather;
    showJoke(); showFact(); showWord(); showWeather();

    const moodBox = view.querySelector('#mood'), forLine = view.querySelector('#for');
    // Dropdowns: Feeling + Activity allow several picks; Who / Budget / Time allow one.
    const dds = [...view.querySelectorAll('.solo-dd')];
    const pick = key => [...view.querySelectorAll(`.solo-dd[data-key="${key}"] .chip.on`)].map(c => c.dataset.v);
    const label = dd => {
      const on = [...dd.querySelectorAll('.chip.on')].map(c => c.dataset.v);
      dd.querySelector('.solo-ddbtn').textContent = `${dd.dataset.label}${on.length ? ': ' + on.join(', ') : ''} ▾`;
      dd.classList.toggle('picked', on.length > 0);
    };
    dds.forEach(dd => {
      dd.querySelector('.solo-ddbtn').onclick = () => { const was = dd.classList.contains('open'); dds.forEach(d => d.classList.remove('open')); dd.classList.toggle('open', !was); };
      dd.querySelectorAll('.chip').forEach(c => c.onclick = () => {
        if (!dd.hasAttribute('data-multi')) { dd.querySelectorAll('.chip').forEach(x => x !== c && x.classList.remove('on')); dd.classList.remove('open'); }
        c.classList.toggle('on'); label(dd);
      });
    });
    const closeMenus = e => { if (!e.target.closest('.solo-dd')) dds.forEach(d => d.classList.remove('open')); };
    document.addEventListener('click', closeMenus);
    view.querySelector('#clear').onclick = () => { view.querySelectorAll('.solo-dd .chip.on').forEach(c => c.classList.remove('on')); dds.forEach(label); moodBox.value = ''; };

    const run = async wild => {
      const text = moodBox.value.trim(), feeling = pick('feeling'), activity = pick('activity');
      const [who] = pick('who'), [budget] = pick('budget'), [time] = pick('time');
      const mood = [text, ...feeling].filter(Boolean).join(', '), query = [text, ...feeling, ...activity, who].filter(Boolean).join(', ');
      const parts = [mood, activity.join(' + '), who && `with ${who === 'just me' ? 'yourself' : who}`, budget, time].filter(Boolean);
      forLine.textContent = parts.length ? `Ideas for: ${parts.join('  ·  ')}` : '';
      out.innerHTML = ui.loading();
      try {
        const context = wild ? { wildcard: 'Suggest something unexpected and out of their usual comfort zone' } : {};
        Object.assign(context, Object.fromEntries(Object.entries({ mood, activity: activity.join(', '), who, budget, time }).filter(([, v]) => v)));
        let { ideas, source } = await app.suggest('solo', context, wild ? 3 : 5);
        // No AI connected (or the picks need play/listen/recipe links): use our own matcher, then apply budget/time.
        let matched = !wild && query ? soloMatch(query) : [];
        if (!wild && !matched.length && (budget || time)) matched = soloIdeas(SOLO_TOPICS.flatMap(t => t.ideas).sort(() => Math.random() - .5));
        const fits = soloFilter(matched, { budget, time });
        if (matched.length && !fits.length) ui.toast('Nothing fit your budget/time exactly, so here are the closest ideas');
        matched = (fits.length ? fits : matched).slice(0, 24);
        if (matched.length && (source === 'fallback' || matched[0].link)) ideas = matched;
        else if (source === 'fallback' && query) ui.toast("Hmm, I didn't catch that. Here are some general ideas!");
        out.innerHTML = '';
        forLine.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showWheel(ideas);
      } catch (e) { out.innerHTML = `<div class="card">${ui.esc(e.message)}</div>`; }
    };
    // Card wheel: one big card in front, neighbours angled behind. Swipe, drag, arrows, dots or ← → keys; loops around.
    let go = null;
    const showWheel = ideas => {
      out.innerHTML = `<div class="solo-wheel">${ideas.map(i => {
        const title = soloTitle(i), watch = soloWatch(i);
        return `<article class="solo-card">
          ${SOLO_POSTERS[title] ? `<div class="solo-poster art">${SOLO_POSTERS[title]}</div>`
            : `<div class="solo-poster" style="${soloBg(title)}"><span>${ui.esc(i.emoji || '✨')}</span></div>`}
          <div class="solo-cbody"><div class="solo-kicker">${ui.esc((i.tags || []).join(' · '))}</div>
            <h3 class="solo-ctitle solo-clamp">${ui.esc(title)}</h3><p class="solo-cdesc solo-clamp">${ui.esc(i.description || '')}</p>
            <div class="solo-meta">${ui.esc([i.duration, i.cost].filter(Boolean).join('  ·  '))}</div>
            <div class="solo-actions">${watch}<button class="solo-love" type="button">Love it 💾</button><button class="solo-more" type="button">More ↗</button></div></div></article>`;
      }).join('')}<button class="solo-arrow solo-prev" type="button" aria-label="Previous">‹</button><button class="solo-arrow solo-next" type="button" aria-label="Next">›</button></div>
        <div class="solo-dots">${ideas.map(() => '<button type="button"></button>').join('')}</div>
        <div class="solo-hint">Swipe, drag or use ← → to browse</div>`;
      const wheelEl = out.querySelector('.solo-wheel'), cards = [...out.querySelectorAll('.solo-card')], dots = [...out.querySelectorAll('.solo-dots button')], n = cards.length;
      let cur = 0;
      go = k => {
        cur = (k + n) % n;
        cards.forEach((c, i) => {
          let d = i - cur; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
          const a = Math.abs(d);
          c.style.transform = `translateX(calc(-50% + ${d * 64}%)) rotateY(${-d * 30}deg) scale(${1 - a * 0.14})`;
          c.style.zIndex = 20 - a; c.style.opacity = a > 2 ? 0 : 1 - a * 0.2; c.style.pointerEvents = a > 2 ? 'none' : 'auto';
          c.classList.toggle('on', d === 0);
        });
        dots.forEach((b, i) => b.classList.toggle('on', i === cur));
      };
      let startX = null, dragged = false;
      cards.forEach((c, i) => {
        c.onclick = e => {
          if (dragged) return;
          if (i !== cur) { e.preventDefault(); go(i); return; }
          if (!e.target.closest('a, .solo-love')) openDetails(ideas[i]);
        };
        c.querySelector('.solo-love').onclick = e => {
          if (i !== cur) return; e.stopPropagation(); save(ideas[i]);
          e.target.textContent = 'Loved ✓'; e.target.disabled = true;
        };
      });
      dots.forEach((b, i) => b.onclick = () => go(i));
      out.querySelector('.solo-prev').onclick = () => go(cur - 1);
      out.querySelector('.solo-next').onclick = () => go(cur + 1);
      wheelEl.onpointerdown = e => { startX = e.clientX; dragged = false; };
      wheelEl.onpointerup = e => {
        if (startX === null) return; const dx = e.clientX - startX; startX = null;
        if (Math.abs(dx) > 40) { dragged = true; go(cur + (dx < 0 ? 1 : -1)); setTimeout(() => dragged = false, 50); }
      };
      let lastWheel = 0;
      wheelEl.onwheel = e => { // trackpad two-finger swipe
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 15) return;
        e.preventDefault(); if (Date.now() - lastWheel < 450) return;
        lastWheel = Date.now(); go(cur + (e.deltaX > 0 ? 1 : -1));
      };
      go(0);
    };
    const keys = e => {
      if (!go || e.target.matches('input, textarea, select') || document.querySelector('.solo-modal')) return;
      const cur = [...out.querySelectorAll('.solo-card')].findIndex(c => c.classList.contains('on'));
      if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1);
    };
    document.addEventListener('keydown', keys);
    // Details pop-up: the idea up top, then Claude's adaptive how-to (recipe, directions, how to play...) loads underneath.
    const detailCache = new Map();
    const openDetails = idea => {
      const title = soloTitle(idea), q = encodeURIComponent(title);
      const cooking = (idea.tags || []).some(t => /cook|recipe|bak|food|dinner/i.test(t));
      const m = ui.el(`<div class="solo-modal" role="dialog" aria-modal="true" aria-label="${ui.esc(title)}"><div class="solo-sheet">
        <button class="solo-x" type="button" aria-label="Close">✕</button>
        <div class="solo-hero" style="${soloBg(title)}"><div class="solo-hemoji">${ui.esc(idea.emoji || '✨')}</div>
          <div><div class="solo-kicker">${ui.esc((idea.tags || []).join(' · '))}</div><h2 class="solo-ctitle">${ui.esc(title)}</h2></div></div>
        <div class="solo-mbody"><p class="solo-cdesc">${ui.esc(idea.description || '')}</p>
          <div class="solo-facts">${[['⏱️', idea.duration], ['💸', idea.cost], ['✨', idea.vibe]].filter(f => f[1]).map(([e, v]) => `<span>${e} ${ui.esc(v)}</span>`).join('')}</div>
          <div class="solo-actions">${soloWatch(idea)}<button class="solo-love" type="button">Love it 💾</button>
            <button class="solo-love solo-inv" type="button">💌 Invite friends</button>
            <a class="solo-love solo-web" target="_blank" rel="noopener" href="https://www.google.com/search?q=${q}${cooking ? '+recipe' : ''}">${cooking ? '🍳 Find the recipe' : '🔎 Look it up'}</a></div>
          <div class="solo-more-info">${ui.loading('Digging up the details')}</div></div></div></div>`);
      const close = () => { m.remove(); document.removeEventListener('keydown', esc, true); };
      const esc = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
      document.addEventListener('keydown', esc, true);
      m.onclick = e => { if (e.target === m) close(); };
      m.querySelector('.solo-x').onclick = close;
      const love = m.querySelector('.solo-love');
      love.onclick = () => { save(idea); love.textContent = 'Loved ✓'; love.disabled = true; };
      m.querySelector('.solo-inv').onclick = () => { close(); app.inviteFriends(idea); };
      document.body.appendChild(m);
      m.querySelector('.solo-x').focus();
      const info = m.querySelector('.solo-more-info'), web = m.querySelector('.solo-web');
      if (!detailCache.has(title)) detailCache.set(title, app.details(idea));
      detailCache.get(title).then(d => {
        if (!m.isConnected) return;
        if (!d || !d.sections || !d.sections.length) {
          detailCache.delete(title);
          info.innerHTML = `<p class="solo-note">🔌 Step-by-step details need the AI switched on. Meanwhile, the buttons above will get you there!</p>`;
          return;
        }
        if (d.search) web.href = 'https://www.google.com/search?q=' + encodeURIComponent(d.search);
        const map = d.place ? `<a class="solo-love" target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(d.place)}">📍 ${ui.esc(d.place)}</a>` : '';
        if (map) web.insertAdjacentHTML('afterend', map);
        info.innerHTML = `${d.summary ? `<p class="solo-summary">${ui.esc(d.summary)}</p>` : ''}<div class="solo-secs">${d.sections.map((sec, n) => {
          const tag = /step|how|method|direction|instruction|plan/i.test(sec.title) ? 'ol' : 'ul';
          return `<div class="solo-sec" style="animation-delay:${n * 90}ms"><h4>${ui.esc(sec.emoji)} ${ui.esc(sec.title)}</h4>
            <${tag}>${sec.items.map(x => `<li>${ui.esc(x)}</li>`).join('')}</${tag}></div>`;
        }).join('')}</div>`;
      });
    };
    const key = 'saved:' + app.user;
    const save = i => { try { const s = JSON.parse(localStorage[key] || '[]'); s.push(i); localStorage[key] = JSON.stringify(s); ui.toast('Saved!'); } catch {} };
    view.querySelector('#moodForm').onsubmit = e => { e.preventDefault(); run(false); };
    view.querySelector('#go').onclick = () => run(false);
    view.querySelector('#wild').onclick = () => run(true);
    return () => { document.removeEventListener('keydown', keys); document.removeEventListener('click', closeMenus); };
  },
});
