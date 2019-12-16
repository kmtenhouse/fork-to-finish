module.exports = async function (err, req, res, next) {
    if (err.name === "WebError") {
        console.log("WebError!")
        console.log(err.message);
        //if this error means the user should be logged out, then make sure that is happening
        if (err.forceLogout === true && req.user) { 
            req.logout();  
            await req.session.destroy();
        }

        if (err.redirectTo) {
            return res.redirectTo(err.redirectTo);
        } else {
            //check if the user is still logged in or not
            return res.status(err.statusCode).json({ loggedIn: (req.user ? true : false) });
        }

    } else {
        next(err);
    }
}