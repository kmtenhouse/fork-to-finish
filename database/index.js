"use strict";

const mongoose = require("mongoose"),
    Promise = require("bluebird");

module.exports = function () {
    let connect;
    connect = (config) => {
        const { databaseRef } = config;
        if(!databaseRef) {
            throw new Error(`Invalid db ref received! ${config.databaseRef}`);
        }
        // Use bluebird
        mongoose.Promise = Promise;
        return mongoose.connect(databaseRef,
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
    }

    return {
        connect
    };
}