// Packages import
const Joi = require('joi');

// Helpers import
const { dateRegex } = require('../helpers/regex');


const getAllKursSchema = (req, res, next) => {

    const schema = Joi.object().keys({
        startdate: Joi.string().regex(dateRegex).required(),
        enddate: Joi.string().regex(dateRegex).required()
    });

    const { error, value } = schema.validate(req.query);
    
    if (error) {
        next("Please input valid date format ( YYYY-MM-DD ).");
    } else {
        req.query = value;
        next();
    }
}

module.exports = getAllKursSchema;