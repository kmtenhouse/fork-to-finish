"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//An example database item: an rgb color 
const colorSchema = new Schema({
  name: {
    type: String,
    maxlength: 55
  },

  hex: {
    type: String,
    required: [true, "Must provide a valid 3 or 6 digit hex for the color!"],
    validate: {
      validator: function (val) {
        return /^#([0-9a-f]{3}){1,2}$/.test(val);
      }
    }
  },
  contrastColor: {
    type: String,
    required: [true, "Must provide a valid 3 or 6 digit hex for the contrast color!"],
    validate: {
      validator: function (val) {
        return /^#([0-9a-f]{3}){1,2}$/.test(val);
      }
    }
  }
});

// Helper function: calculate the contrast color for a particular new color

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;