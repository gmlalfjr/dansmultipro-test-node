const errors = {
    BAD_REQUEST_ERROR: 'BAD_REQUEST_ERROR',
    DB_ERROR: 'DB_ERROR'
};

const errorMessages = {
    BAD_REQUEST_ERROR: 'Could not parse request body.',
    USER_EXIST: 'User Already Exist',
    DB_ERROR: 'Database Transaction Error'
};

const errorCodes = {
    BAD_REQUEST_ERROR: 400,
    DB_ERROR: 'DB_ERROR'
};

module.exports = {
    errors,
    errorCodes,
    errorMessages
};
