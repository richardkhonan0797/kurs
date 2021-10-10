// Packages import
const router = require('express').Router();

// Controller import
const kursController = require('../controllers/kursController');

// Joi schemas import
const { 
    deleteKursSchema,
    getAllKursSchema,
    getByCurrencyAndDateSchema,
    postKursSchema,
    putKursSchema
} = require('../joiSchemas/index')

router.delete('/:date', deleteKursSchema, kursController.deleteKurs);
router.get('/', getAllKursSchema, kursController.getAllKursFromDate);
router.get('/:symbol', getByCurrencyAndDateSchema, kursController.getByCurrencyAndDate);
router.post('/', postKursSchema, kursController.postKurs);
router.put('/', putKursSchema, kursController.putKurs);

module.exports = router;