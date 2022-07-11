function SuccessResponse(message, data = {}, statusCode) {
    return {
        message,
        data,
        statusCode
    }
}

module.exports = {SuccessResponse}