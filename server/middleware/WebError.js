"use strict";
class WebError extends Error {
    constructor(message, statusCode, redirectTo="") {
        super(message);
        this.statusCode = statusCode;
        this.redirectTo = redirectTo; 
    }
}

module.exports = WebError;