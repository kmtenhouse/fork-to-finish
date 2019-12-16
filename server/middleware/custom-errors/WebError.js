class WebError extends Error {
    constructor(message, obj) {
        super(message);
        this.name = "WebError";
        this.statusCode = obj.statusCode || 500;
        this.redirectTo = obj.redirectTo || null;
        this.forceLogout = (obj.forceLogout === true ? true : false);
    }
}

module.exports = WebError;