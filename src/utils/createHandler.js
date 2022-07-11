const createHandler = (handler) => {

    return async (req, res, next) => {
        let error = null
        try {
            await handler(req, res);
        } catch (err) {
            error = err;
        }
        if (error != null) {
            return next(res.json({
                errorMessage: error.message,
                statusCode: error.statusCode ? error.statusCode : "INTERNAL SERVER ERROR",
                code: error.code ? error.code : 500
            }))
        }
      
        return next(error);
    };
};

module.exports = createHandler;
