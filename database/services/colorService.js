"use strict";
const Color = require("../schema/Color");
const User = require("../schema/User");
const Promise = require("bluebird");

//Require utilities
const ServiceError = require("./utils/ServiceError");
const getContrastColor = require("./utils/contrastColor").getContrastColor;

function findAllColors() {
    return Color.find({});
}

function findAllColorsByUser(id) {
    return User.findById(id).select('colors').populate('colors');
}

async function deleteOne(colorToRemove, cb) {
    try {
        const result = await Color.deleteOne({ _id: colorToRemove._id, user: colorToRemove.user });
        if(!result) {
            throw new ServiceError("Did not find that color under the user's name!", 404);
        }

        //now pull it from the user as well
        await User.findOneAndUpdate({ _id: colorToRemove.user }, { $pull: { colors: colorToRemove._id } });

        cb(null, result);
    }
    catch (err) {
        cb(err, null);
    }
}

async function createOne(obj, cb) {
    try {
        //look up the user we want to save a color for...they need to exist 
        const associatedUser = User.findById(obj.user);

        if (!associatedUser) {
            throw new ServiceError("Colors must be associated with a user!", 400);
        }

        //If a contrast color was not provided, we generate one
        if (!obj.contrastColor) {
            obj.contrastColor = getContrastColor(obj.hex);
        }

        const newColor = await Color.create({
            user: obj.user,
            name: obj.name,
            hex: obj.hex,
            contrastColor: obj.contrastColor
        });

        //now that we have the new color, find the user and update their record too!
        await User.findOneAndUpdate({ _id: obj.user }, { $push: { colors: newColor._id } });

        cb(null, newColor);

    } catch (err) {
        cb(err, null);
    }
}

module.exports = {
    findAllColors,
    findAllColorsByUser,
    deleteOne: Promise.promisify(deleteOne),
    createOne: Promise.promisify(createOne)
}