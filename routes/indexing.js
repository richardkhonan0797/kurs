const router = require('express').Router();
const indexingController = require('../controllers/indexingController');

router.get('/', indexingController.getIndexing);

module.exports = router