// Profile (customization settings) saved per user. Shape is free-form; see CLAUDE.md for the agreed fields.
const { save } = require('./db');
module.exports = ({ route }) => {
  route('PUT', '/api/profile', ({ user, body }) => { user.profile = body.profile || {}; save(); return { profile: user.profile }; });
};
