const Example = require("../services/exampleService");

module.exports = {
    findAll: function (req, res) {
        Example.findAllExamples()
            .then(results => res.json(results))
            .catch(err => res.status(500).json({ error: err.message }));
    },
    create: function (req, res) {
        Example.createOne({ text: req.body.text })
            .then(result => res.json(result))
            .catch(err => res.status(400).json({ error: err.message }));
    },
    delete: function (req, res) {
        Example.deleteOne(req.params.id)
            .then(result => res.json(result))
            .catch(err => {
                (err.message === "Not Found" ? res.status(404) : res.status(400));
                res.json({ error: err.message });
            });
    }
}