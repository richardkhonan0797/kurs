// Packages import
const Joi = require('joi');

// Helpers import
const { dateRegex } = require('../helpers/regex');


const getByCurrencyAndDateSchema = (req, res, next) => {

    const schema = Joi.object().keys({
        symbol: Joi.string().min(3).max(3).valid(
            "USD", "SGD", "EUR", "AUD", "DKK", "SEK", "CAD", "CHF", "NZD", "GBP", "HKD", "JPY", "SAR", "CNH", "MYR", "THB"
        ).required(),
        startdate: Joi.string().regex(dateRegex).required(),
        enddate: Joi.string().regex(dateRegex).required()
    });

    let req_params_and_query = {
        "symbol": req.params["symbol"],
        "startdate": req.query["startdate"],
        "enddate": req.query["enddate"]
    }

    const { error, value } = schema.validate(req_params_and_query);
    
    if (error) {
        if ( error.message.includes("symbol")) {
            next("Please input correct currency symbol.");
        } else {
            next("Please input valid date format ( YYYY-MM-DD ).");
        }
    } else {
        req.query["startdate"] = value["startdate"];
        req.query["enddate"] = value["enddate"];
        req.params["symbol"] = value["symbol"];
        next();
    }
}

module.exports = getByCurrencyAndDateSchema;