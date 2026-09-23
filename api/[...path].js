// Vercel entry: every /api/* request goes through the same handler used locally.
module.exports = require('../server/index.js').handler;
