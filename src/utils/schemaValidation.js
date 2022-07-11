const validateSchema = (payload, schema) => {
    const result = schema.validate(payload);

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.value;
};

const createValidation = validation => (req, res, next) => {
    let error = null
    const {
        headers: headersSchema,
        query: querySchema,
        params: paramsSchema,
        body: bodySchema
    } = validation;
    const {
        headers, query, params, body
    } = req;

    try {
        Object.assign(res.locals, {
            payload: {
                headers: headersSchema ? validateSchema(headers, headersSchema) : {},
                query: querySchema ? validateSchema(query, querySchema) : {},
                params: paramsSchema ? validateSchema(params, paramsSchema) : {},
                body: bodySchema ? validateSchema(body, bodySchema) : {}
            }
        });
    } catch (err) {
        error = err
    }

    if (error != null) {
        return next(res.json({
            code: "BAD_REQUEST",
            statusCode: 400,
            errorMessage: error.message
        }))
    }
    
    return next();
};

module.exports = createValidation;
