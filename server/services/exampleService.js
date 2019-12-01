
const Example = require("../../database/schema/Example");

module.exports = {

    findAllExamples: function () {
        return Example.find({});
    },

    createOne: function (exampleObj) {
        return Example.create(exampleObj);
    },

    deleteOne: function (id) {
        return Example.deleteOne({ _id: id});
    }
}