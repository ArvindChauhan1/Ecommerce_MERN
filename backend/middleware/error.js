const ErrorHandler = require("../utils/errorhandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    //wrong mongodb _ID error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,

        // error detail will show only on development
        ...process.env.NODE_ENV === "development" || false ? { error: err.stack } : {}
    })
}