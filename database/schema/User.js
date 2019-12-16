"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: Number, required: true, select: false },
  colors: {
    type: [{
      type: Schema.Types.ObjectId, ref: 'Color'
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 16']
  }
});

function arrayLimit(val) {
  return val.length <= 16;
}

const User = mongoose.model('User', userSchema);

module.exports = User;