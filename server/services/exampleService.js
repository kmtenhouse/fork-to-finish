
const Example = require("../../database/schema/Example");

module.exports = {

    findAllExamples: function(){
        return Example.find({});
    },

    createExample: function(exampleObj) {
        return Example.create(exampleObj);
    }

}