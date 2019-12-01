const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
  email: { type: String, required: true, max: [254, "Too many characters"] },
  googleId: { type: Number, required: false },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;