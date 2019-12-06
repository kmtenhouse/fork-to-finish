class AuthenticationError extends Error {
    constructor(message, redirectTo="") {
        super(message);
        this.redirectTo = redirectTo;
    }
}

module.exports = AuthenticationError;