"use strict";
const Color = require("../services/colorService");

module.exports = {
    findAll: async function (req, res, next) {
        try {
            const results = await Color.findAllColors();
            res.json(results);
        } catch (err) {
            next(err);
        }
    },
    create: async function (req, res, next) {
        try {
            const newColor = await Color.createOne(req.body);
            res.json(newColor);
        }
        catch(err) {
            next(err);
        }        
    },
    delete: async function (req, res, next) {
        try {
            const deleteOperation = await Color.deleteOne(req.params.id);
            res.json(deleteOperation);
        }
        catch(err) {
            next(err);
        }
    }
}