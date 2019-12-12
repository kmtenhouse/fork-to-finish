module.exports = function(err, req, res, next) {
    if(err.name === "ValidationError") {
        console.log("Mongo Error!")
        console.log(err.message);
        return res.sendStatus(400);
    } else {
        next(err);
    }
}