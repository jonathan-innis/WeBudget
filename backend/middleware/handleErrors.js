const { GeneralError } = require('../utils/errors');

const handleError = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        console.log('Here');
        return res.status(err.getCode()).send({
            status: 'error',
            message: err.message,
        });
    }

    return res.status(500).send({
        status: 'error',
        message: err.message,
    });
}

module.exports = handleError;