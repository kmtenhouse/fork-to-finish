module.exports = function(err, req, res, next) {
    if(err.name === "ServiceError") {
        console.log("Service Error!")
        console.log(err.message);
        return res.sendStatus(400);
    } else {
        next(err);
    }
}