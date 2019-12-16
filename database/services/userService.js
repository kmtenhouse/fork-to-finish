"use strict";
const User = require("../schema/User");
const ServiceError = require("./utils/ServiceError");
const Promise = require("bluebird");

function findById(id) {
    return User.findOne({ _id: id });
}

function createOne(obj) {
    return User.create(obj);
}

async function findOrCreateViaGoogleId(obj, cb) {
    try {
        if (!obj.googleId) {
            throw new ServiceError("Must provide a valid google id!", 400);
        }

        // Attempt to look up the current user
        let currentUser = await User.findOne({ googleId: obj.googleId });

        // If we don't find them: attempt to create them!
        if (!currentUser) {
            currentUser = await User.create({ googleId: obj.googleId });
        }
        
        cb(null, currentUser);
    }
    catch (err) {
        cb(err, null);
    }
}

async function updateOne(id, obj) {
    try {
        //the only thing we are allowed to update is the color ids
        if(!obj.colors || !Array.isArray(obj.colors)) {
            throw new ServiceError("Can't update without an array of color ids!", 400);
        }

        //make sure we haven't exceeded our max # of colors per user (16)
        if(obj.colors.length > 16) {
            throw new ServiceError("Too many colors provided!", 400);
        }

        //filter the array for ids only -- if we find malformed data, throw an error
        const filteredIds = obj.colors.map(color => color._id);

        //attempt to find the current user
        let userToUpdate = await User.findOne({ _id: id });
        if(!userToUpdate) {
            throw new ServiceError("Can't update a nonexistent user!", 404);
        }
        
        //otherwise, perform the update
        userToUpdate.colors = filteredIds;
        await userToUpdate.save();
        cb(null, userToUpdate);
    }
    catch(err) {
        cb(err, null);
    }
}

module.exports = {
    findById,
    createOne,
    findOrCreateViaGoogleId: Promise.promisify(findOrCreateViaGoogleId),
    update: Promise.promisify(updateOne)
};