// Vercel entry: vercel.json rewrites every /api/* request here, and it runs the same handler used locally.
module.exports = require('../server/index.js').handler;
