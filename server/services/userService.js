const User = require("../../database/schema/User");
const ServiceError = require("./utils/ServiceError");
const Promise = require("bluebird");


function findById(id) {
    return User.findOne({ _id: id });
}

function createOne(obj) {
    return User.create(obj);
}

async function findOrCreateViaEmail(obj, cb) {
    try {
        if (!obj.email) {
            throw new ServiceError("Must provide an email!", 400);
        }

        // Attempt to look up the current user
        let currentUser = await User.findOne({ email: obj.email });

        // If we don't find them: attempt to create them!
        if (!currentUser) {
            const newUser = { email: obj.email };
            if (obj.googleId) {
                newUser["googleId"] = obj.googleId;
            }
            currentUser = await User.create(newUser);
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
    findOrCreateViaEmail: Promise.promisify(findOrCreateViaEmail)
};