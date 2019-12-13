"use strict";

const mongoose = require("mongoose"),
    Promise = require("bluebird");

module.exports = function () {
    let connect;
    connect = (config) => {
        const { databaseRef } = config;

        // Use bluebird
        mongoose.Promise = Promise;
        return mongoose.connect(databaseRef,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
    }

    return {
        connect
    };
}