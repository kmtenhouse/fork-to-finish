const mongoErrorHandler = require("./mongoErrorHandler");
const serviceErrorHandler = require("./serviceErrorHandler");
const webErrorHandler = require("./webErrorHandler");

module.exports = [
    webErrorHandler,
    mongoErrorHandler, 
    serviceErrorHandler
];