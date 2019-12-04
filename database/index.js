"use strict";

const mongoose = require("mongoose"),
    bluebird = require("bluebird");

module.exports = function () {
    let connect;
    connect = (config) => {
        const { databaseRef } = config;
        // Use bluebird
        mongoose.Promise = bluebird;
        return mongoose.connect(databaseRef,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
    }

    return {
        connect: connect
    };
}