// Packages import
const Joi = require('joi');

// Helpers import
const { dateRegex } = require('../helpers/regex');


const deleteKursSchema = (req, res, next) => {

    const schema = Joi.object().keys({
        date: Joi.string().regex(dateRegex).required()
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = schema.validate(req.params, options);
    
    if (error) {
        next("Please input valid date format ( YYYY-MM-DD ).");
    } else {
        req.params = value;
        next();
    }
}

module.exports = deleteKursSchema;