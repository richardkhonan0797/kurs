// Packages import
const Joi = require('joi');

// Helpers import
const { dateRegex } = require('../helpers/regex');


const postKursSchema = (req, res, next) => {

    const schema_jb = Joi.object().keys({
        jual: Joi.number().required(),
        beli: Joi.number().required()
    })

    const schema = Joi.object().keys({
        symbol: Joi.string().min(3).max(3).valid(
            "USD", "SGD", "EUR", "AUD", "DKK", "SEK", "CAD", "CHF", "NZD", "GBP", "HKD", "JPY", "SAR", "CNH", "MYR", "THB"
        ).required(),
        erate: schema_jb,
        tt: schema_jb,
        notes: schema_jb,
        date: Joi.string().regex(dateRegex).required()
    });

    const { error, value } = schema.validate(req.body);
    
    if (error) {
        if ( error.message.includes("symbol")) {
            next("Please input correct currency symbol.");
        } else if ( error.message.includes("date") ) {
            next("Please input valid date format ( YYYY-MM-DD ).");
        } else {
            next("Please input correct price.");
        }
    } else {
        req.body = value;
        next();
    }
}

module.exports = postKursSchema;