// Kurs Schemas
const deleteKursSchema = require('./deleteKursSchema');
const getAllKursSchema = require('./getAllKursSchema');
const getByCurrencyAndDateSchema = require('./getByCurrencyAndDateSchema');
const postKursSchema = require('./postKursSchema');
const putKursSchema = require('./putKursSchema');

module.exports = {
    deleteKursSchema,
    getAllKursSchema,
    getByCurrencyAndDateSchema,
    postKursSchema,
    putKursSchema
}