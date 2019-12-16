"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
  googleId: { type: Number, required: true, select: false },
  colors: [ {
    type: Schema.Types.ObjectId, ref: 'Color'
  }]                                                                      
});

const User = mongoose.model('User', userSchema);

module.exports = User;