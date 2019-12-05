module.exports = {
    //this function promisifies an existing express function so that any unhandled errors within will be automagically passed to next()
    //this will ensure that any unexpected errors flow through to 
    handleErrs: function (expressFn) {  
        return function(req, res, next) {
            expressFn(req, res, next).catch(next);
        };
    }
};