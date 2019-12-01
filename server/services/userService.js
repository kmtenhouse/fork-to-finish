const User = require("../../database/schema/User");

module.exports = {
    findById: function (id) {
        return User.findOne({ _id: id });
    },

    createOne: function (obj) {
        return User.create(obj);
    },

    findOrCreateViaEmail: async function (obj) {
        try {
            if(!obj.email) {
                throw new Error("Must provide an email!");
            }

            let currentUser = await User.findOne({ email: obj.email });
            if(!currentUser) {
                const newUser = { email: obj.email};
                if(obj.googleId && Number.isInteger(obj.googleId)) {
                    newUser["googleId"] = obj.googleId;
                }
                currentUser = await User.create(newUser);
            }
            return currentUser;
        }
        catch (err) {
            throw err;
        }
    }
};