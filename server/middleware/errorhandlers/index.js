const mongoErrorHandler = require("./mongoErrorHandler");
const serviceErrorHandler = require("./serviceErrorHandler");

module.exports = [
    mongoErrorHandler, 
    serviceErrorHandler
];