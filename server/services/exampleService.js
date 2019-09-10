
const Example = require("../../database/schema/Example");

module.exports = {

    findAllExamples: function () {
        return Example.find({});
    },

    createOne: function (exampleObj) {
        return Example.create(exampleObj);
    },

    deleteOne: function (id) {
        return new Promise((resolve, reject) => {
            //check if we're receiving a valid mongo id
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(id)) {
                reject(new Error("Must be a valid id format"));
            }
            Example.deleteOne({ _id: id })
                .then(result => {
                    if(!result || result.deletedCount === 0) {
                        reject(new Error("Not Found"))
                    } else {
                        resolve(result);
                    }
                })
                .catch(err=>reject(err));
        })

    }
}