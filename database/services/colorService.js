"use strict";
const Color = require("../schema/Color");
const Promise = require("bluebird");

//Require utilities
const ServiceError = require("./utils/ServiceError");
const getContrastColor = require("./utils/contrastColor").getContrastColor;

function findAllColors() {
    return Color.find({});
}

function deleteOne(id) {
    return Color.deleteOne({ _id: id });
}

async function createOne(obj, cb) {
    try {
        //Business logic:
        //If a contrast color was not provided, we generate one
        if (!obj.contrastColor) {
            obj.contrastColor = getContrastColor(obj.hex);
        }

        const newColor = await Color.create({
            name: obj.name,
            hex: obj.hex,
            contrastColor: obj.contrastColor
        });

        cb(null, newColor);
    } catch (err) {
        if (err.message === "Cannot convert hex to RGB!") { 
            cb(new ServiceError("Cannot autogenerate contrast color!", 400), null);
            return;
        }
        cb(err, null);
    }
}

module.exports = {
    findAllColors,
    deleteOne,
    createOne: Promise.promisify(createOne)
}