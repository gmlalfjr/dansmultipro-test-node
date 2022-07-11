const ExtendableError = require('es6-error');

class CustomError extends ExtendableError {
    constructor(message, code , statusCode , data) {
        super(message);        
        this.code = code;
        this.statusCode = statusCode;
        this.errorMessage = message;

    }
}

module.exports = CustomError;
