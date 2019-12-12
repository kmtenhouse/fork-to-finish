"use strict";

class ServiceError extends Error {
    constructor(message="", statusCode=500) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ServiceError";
    }
}

module.exports = ServiceError;