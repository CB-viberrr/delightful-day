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
const soloYT = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
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
  { first: true, words: ['movie', 'film', 'watch', 'netflix', 'show'], ideas: [
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
const SOLO_ACTIVITIES = [['🎮', 'games'], ['🎬', 'movies'], ['🎵', 'songs'], ['💃', 'dancing'], ['🍳', 'cooking'], ['📍', 'going out'], ['📚', 'books']];
const SOLO_MOODS = [['😄', 'happy'], ['😢', 'sad'], ['😴', 'tired'], ['🥳', 'social'], ['⚡', 'wired'], ['💸', 'broke'],
  ['🧭', 'adventurous'], ['💕', 'romantic'], ['🛋️', 'cozy'], ['😤', 'stressed']];

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
  .solo-wheel { position: relative; height: 600px; perspective: 1400px; overflow: hidden; touch-action: pan-y; user-select: none; margin-top: 6px; }
  .solo-card { position: absolute; left: 50%; top: 14px; width: 340px; background: #14152c; border: 1px solid var(--line); border-radius: 22px;
    overflow: hidden; box-shadow: 0 30px 70px #0009; cursor: pointer; transition: transform .6s cubic-bezier(.2,.8,.2,1), opacity .45s, filter .45s; }
  .solo-card:not(.on) { filter: brightness(.6); }
  .solo-card.on { cursor: grab; border-color: #ffffff2a; }
  .solo-poster { height: 240px; display: grid; place-items: center; font-size: 104px; position: relative; }
  .solo-poster::after { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 50%, #14152c); }
  .solo-poster span { filter: drop-shadow(0 12px 24px #0007); z-index: 1; }
  .solo-cbody { padding: 0 28px 26px; position: relative; }
  .solo-kicker { font-size: 11px; letter-spacing: .24em; text-transform: uppercase; color: var(--mute); margin-bottom: 10px; }
  .solo-ctitle { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size: 36px; line-height: 1.05; margin: 0 0 12px; font-weight: 600; letter-spacing: -.01em; }
  .solo-cdesc { font-family: Georgia, serif; font-style: italic; font-size: 17px; line-height: 1.5; color: #d9d6f2; margin: 0 0 16px; }
  .solo-meta { font-size: 13px; color: var(--mute); margin-bottom: 20px; letter-spacing: .04em; }
  .solo-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .solo-actions a, .solo-actions button { font: inherit; font-size: 14px; font-weight: 700; padding: 9px 16px; border-radius: 999px; cursor: pointer; text-decoration: none; }
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
      const isMovie = i => (i.tags || []).some(t => /movie|film/i.test(t));
      out.innerHTML = `<div class="solo-wheel">${ideas.map(i => {
        const title = String(i.title || '').replace(/^watch\s+/i, '').replace(/^"(.*)"$/, '$1');
        const hue = [...title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 17);
        const watch = /^https:\/\//.test(i.link || '') ? `<a class="solo-watch" target="_blank" rel="noopener" href="${ui.esc(i.link)}">${ui.esc(i.linkLabel || '🎮 Play now')}</a>`
          : isMovie(i) ? `<a class="solo-watch" target="_blank" rel="noopener" href="https://www.justwatch.com/us/search?q=${encodeURIComponent(title)}">▶ Where to watch</a>` : '';
        return `<article class="solo-card">
          <div class="solo-poster" style="background: radial-gradient(circle at 30% 20%, hsl(${hue} 80% 62%), hsl(${(hue + 50) % 360} 60% 30%) 60%, #14152c)"><span>${ui.esc(i.emoji || '✨')}</span></div>
          <div class="solo-cbody"><div class="solo-kicker">${ui.esc((i.tags || []).join(' · '))}</div>
            <h3 class="solo-ctitle">${ui.esc(title)}</h3><p class="solo-cdesc">${ui.esc(i.description || '')}</p>
            <div class="solo-meta">${ui.esc([i.duration, i.cost].filter(Boolean).join('  ·  '))}</div>
            <div class="solo-actions">${watch}<button class="solo-love" type="button">Love it 💾</button></div></div></article>`;
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
        c.onclick = e => { if (dragged || i === cur) return; e.preventDefault(); go(i); };
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
      if (!go || e.target.matches('input, textarea, select')) return;
      const cur = [...out.querySelectorAll('.solo-card')].findIndex(c => c.classList.contains('on'));
      if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1);
    };
    document.addEventListener('keydown', keys);
    const key = 'saved:' + app.user;
    const save = i => { try { const s = JSON.parse(localStorage[key] || '[]'); s.push(i); localStorage[key] = JSON.stringify(s); ui.toast('Saved!'); } catch {} };
    view.querySelector('#moodForm').onsubmit = e => { e.preventDefault(); run(false); };
    view.querySelector('#go').onclick = () => run(false);
    view.querySelector('#wild').onclick = () => run(true);
    return () => { document.removeEventListener('keydown', keys); document.removeEventListener('click', closeMenus); };
  },
});
