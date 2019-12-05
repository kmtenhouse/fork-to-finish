const User = require("../../database/schema/User");
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

module.exports = {
    findById,
    createOne,
    findOrCreateViaGoogleId: Promise.promisify(findOrCreateViaGoogleId)
};