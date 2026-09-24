// POST /api/suggest { mode, profile, context } -> { ideas: Idea[], source: 'claude'|'fallback' }
// mode: 'solo' | 'group' | 'network' | 'icebreakers'.  Idea: { title, emoji, description, tags[], cost, duration, vibe, mode }
const GUIDE = {
  solo: 'creative, personal things ONE person could do tonight, tailored to their profile',
  group: 'shared activities a GROUP could do together tonight (consider groupSize and mixed tastes)',
  network: 'ways to network tonight: events to attend, communities to visit, people-to-meet goals, low-pressure formats',
  icebreakers: 'conversation starters and icebreakers for meeting new people at a networking or social event',
};
const FALLBACK = {
  solo: [
    ['🎨', 'Sketch your street from memory', 'Set a 20-minute timer and draw the block you live on without looking outside.', ['creative', 'chill'], 'free', '30m'],
    ['🍜', 'Cook a dish from a country you have never visited', 'Pick a random country, find one recipe, and make it.', ['food', 'adventurous'], '$', '1.5h'],
    ['🚶', 'Golden-hour walk with a new route', 'Take a route you have never walked, and photograph three things that feel like home.', ['outdoors', 'chill'], 'free', '1h'],
    ['📖', 'Read the first chapter of three books', 'Sample three books from your shelf and keep whichever pulls you in.', ['quiet', 'curious'], 'free', '1h'],
    ['🎧', 'Album from start to finish, no phone', 'Pick a full album, lie down, and listen with the lights off.', ['music', 'chill'], 'free', '45m'],
    ['✉️', 'Write a real letter to a friend', 'Hand-write one page to someone you have not talked to in a while.', ['creative', 'meaningful'], '$', '30m'],
  ],
  group: [
    ['🎲', 'Board game tournament', 'Bracket of three quick games, loser does the dishes.', ['games', 'cozy'], '$', '2h'],
    ['🍕', 'Build-your-own pizza night', 'Everyone brings one topping, then vote on the weirdest combo.', ['food', 'cozy'], '$$', '2h'],
    ['🎤', 'Karaoke with a twist', 'Everyone picks a song for the person to their left.', ['music', 'loud'], '$$', '2h'],
    ['🌆', 'Sunset picnic and photo scavenger hunt', 'Split into teams with a list of 10 photos to find.', ['outdoors', 'active'], '$', '2h'],
    ['🎬', 'Themed movie night with snack pairing', 'Pick a decade, watch a movie, and match snacks to it.', ['cozy', 'chill'], '$', '3h'],
    ['🧩', 'Escape room or puzzle box', 'Book a local escape room, or open a puzzle box at home.', ['games', 'teamwork'], '$$$', '1.5h'],
  ],
  network: [
    ['🤝', 'Go to one local meetup and talk to exactly three people', 'Set a small, achievable goal: three real conversations, then leave.', ['events', 'low-pressure'], 'free', '2h'],
    ['☕', 'Coffee chat request', 'Message one person whose work you admire and ask for 20 minutes this week.', ['1:1', 'online'], 'free', '15m'],
    ['🎟️', 'Volunteer at an event', 'Working the check-in table gives you a built-in reason to talk to everyone.', ['events', 'easy-entry'], 'free', '3h'],
    ['💬', 'Join a community Slack or Discord and answer a question', 'Pick a channel in your field and help one person today.', ['online', 'giving'], 'free', '30m'],
    ['🍷', 'Host a small dinner of 4 strangers-of-friends', 'Ask each friend to bring one person you have not met.', ['hosting', 'warm'], '$$', '3h'],
  ],
  icebreakers: [
    ['❓', 'What are you working on that you are excited about?', 'Opens the door far better than "what do you do?"', ['opener'], 'free', '1m'],
    ['🌍', 'What is the best thing you have discovered this month?', 'Invites a story, not a job title.', ['opener', 'fun'], 'free', '1m'],
    ['🎯', 'Who is someone you would love to meet here?', 'Great for helping each other with introductions.', ['connector'], 'free', '1m'],
    ['🛠️', 'What is a problem you are stuck on that I could think about with you?', 'Turns a chat into a useful exchange.', ['deep'], 'free', '2m'],
    ['🧭', 'How did you end up doing this?', 'Everyone has an origin story, and people love telling it.', ['opener', 'story'], 'free', '2m'],
  ],
};
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const fallback = (mode, n = 5, avoid = []) => {
  const all = FALLBACK[mode] || FALLBACK.solo, fresh = all.filter(i => !avoid.includes(i[1]));
  return shuffle(fresh.length ? fresh : all).slice(0, n).map(([emoji, title, description, tags, cost, duration]) =>
  ({ emoji, title, description, tags, cost, duration, vibe: tags[0], mode }));
};

async function askClaude(mode, profile, context, n) {
  const key = process.env.ANTHROPIC_API_KEY; if (!key) return null;
  const prompt = `You are the idea engine for a "what should we do tonight?" web app.
Suggest ${n} ${GUIDE[mode] || GUIDE.solo}.
User profile (JSON, fields may be empty): ${JSON.stringify(profile || {})}
Extra context (JSON): ${JSON.stringify(context || {})}
Respect their budget, energy, mood, vibe, time available, and interests. Be specific, fresh and delightful, never generic.
If context.avoid lists titles, do NOT suggest those or anything very similar.
Reply with ONLY a JSON array, no prose. Each item: {"title": string, "emoji": one emoji, "description": 1-2 sentences, "tags": [2-3 short strings], "cost": "free"|"$"|"$$"|"$$$", "duration": string like "1h", "vibe": one word}`;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST', signal: AbortSignal.timeout(25000),
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: process.env.CLAUDE_MODEL || 'claude-sonnet-5', max_tokens: 1800, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!r.ok) throw new Error('Claude API ' + r.status);
  const text = (await r.json()).content.map(c => c.text || '').join('');
  const arr = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1));
  return arr.map(i => ({ ...i, mode, tags: i.tags || [] }));
}

// POST /api/details { idea } -> { details: { summary, sections: [{ title, emoji, items[] }], place?, search? } | null }
// Fills the Spark pop-up: a recipe gets ingredients + steps, an outing gets where/how, a game gets how to play, etc.
async function askDetails(idea, profile) {
  const key = process.env.ANTHROPIC_API_KEY; if (!key) return null;
  const prompt = `A user of a "what should we do tonight?" app opened this idea to see more: ${JSON.stringify(idea)}
Their profile (JSON): ${JSON.stringify(profile || {})}
Write the practical details they need to actually do it tonight. Adapt the sections to the kind of idea:
a recipe gets "Ingredients" and "Steps"; a place or outing gets "Where to go", "Getting there", "What to bring";
a game or activity gets "How to play" or "How to do it"; a movie gets "Why it fits" and "Pair it with". Always end with a short "Pro tips" section.
Keep items short (one line each), specific and upbeat. 2-4 sections, 3-8 items each. Never invent URLs or phone numbers.
Reply with ONLY JSON, no prose: {"summary": 1-2 sentences, "sections": [{"title": string, "emoji": one emoji, "items": [string]}],
"place": optional real place name + city to look up on a map (omit if none), "search": optional web search query that finds the recipe, venue, or tickets}`;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST', signal: AbortSignal.timeout(25000),
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: process.env.CLAUDE_MODEL || 'claude-sonnet-5', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!r.ok) throw new Error('Claude API ' + r.status);
  const text = (await r.json()).content.map(c => c.text || '').join('');
  const d = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const str = v => (typeof v === 'string' ? v.slice(0, 300) : undefined);
  return { summary: str(d.summary), place: str(d.place), search: str(d.search),
    sections: (Array.isArray(d.sections) ? d.sections : []).slice(0, 5).map(x => ({ title: str(x.title) || '', emoji: str(x.emoji) || '',
      items: (Array.isArray(x.items) ? x.items : []).slice(0, 12).map(str).filter(Boolean) })) };
}

const hits = {}; // per-user rate limit (in memory): 40 requests per 10 minutes
module.exports = ({ route, HttpError }) => {
  route("POST", "/api/suggest", async ({ body, user }) => {
    const now = Date.now(), h = (hits[user.username] = (hits[user.username] || []).filter(t => now - t < 600000));
    if (h.length >= 40) throw new HttpError(429, "Slow down a little, try again in a few minutes"); h.push(now);
    const mode = FALLBACK[body.mode] ? body.mode : 'solo', n = Math.min(body.count || 5, 8);
    try { const ideas = await askClaude(mode, body.profile, body.context, n); if (ideas && ideas.length) return { ideas, source: 'claude' }; }
    catch (e) { console.error('suggest fallback:', e.message); }
    const avoid = Array.isArray(body.context && body.context.avoid) ? body.context.avoid : [];
    return { ideas: fallback(mode, n, avoid), source: 'fallback' };
  }, { slow: true });
  route("POST", "/api/details", async ({ body, user }) => {
    const now = Date.now(), h = (hits[user.username] = (hits[user.username] || []).filter(t => now - t < 600000));
    if (h.length >= 40) throw new HttpError(429, "Slow down a little, try again in a few minutes"); h.push(now);
    const i = body.idea || {}, idea = { title: String(i.title || '').slice(0, 200), description: String(i.description || '').slice(0, 600),
      tags: (Array.isArray(i.tags) ? i.tags : []).slice(0, 6).map(t => String(t).slice(0, 40)), cost: String(i.cost || '').slice(0, 20), duration: String(i.duration || '').slice(0, 20) };
    try { return { details: await askDetails(idea, body.profile) }; }
    catch (e) { console.error('details fallback:', e.message); return { details: null }; }
  }, { slow: true });
};
