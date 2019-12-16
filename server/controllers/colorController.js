"use strict";
const Color = require("../../database/services/colorService");

module.exports = {
    findAll: async function (req, res, next) {
        try {
            const results = await Color.findAllColors();
            res.json(results);
        } catch (err) {
            next(err);
        }
    },
    findAllByUser: async function (req, res, next) {
        try {
            const results = await Color.findAllColorsByUser(req.user._id);
            res.json(results);
        } catch (err) {
            next(err);
        }
    },
    create: async function (req, res, next) {
        try {
            const newColor = await Color.createOne({
                user: req.user._id,
                name: req.body.name,
                hex: req.body.hex,
                contrastColor: req.body.contrastColor
            });
            
            res.json(newColor);
        }
        catch (err) {
            next(err);
        }
    },
    delete: async function (req, res, next) {
        try {
            const deleteOperation = await Color.deleteOne({_id: req.params.id, user: req.user._id });
            res.json(deleteOperation);
        }
        catch (err) {
            next(err);
        }
    }
}