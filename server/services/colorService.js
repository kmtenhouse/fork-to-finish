"use strict";
const Color = require("../../database/schema/Color");

module.exports = {

    findAllColors: function () {
        return Color.find({});
    },

    createOne: function (colorObj) {
        return Color.create(colorObj);
    },

    deleteOne: function (id) {
        return Color.deleteOne({ _id: id});
    }
}