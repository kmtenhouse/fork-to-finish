const Example = require("../services/exampleService");

module.exports = {
    findAll: function(req, res) {
        Example.findAllExamples()
            .then( results =>res.json(results))
            .catch(err => res.status(400).json(err));
    },
    create: function(req, res) {
        if(!req.body.text || !typeof req.body.text === "String")
        {
            return res.json(new Error("Must provide text for the example object!"));
        }
        Example.createExample( { text: req.body.text } )
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err));
    }   
}