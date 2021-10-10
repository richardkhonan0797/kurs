const express = require('express');
const router = express.Router();

const indexing = require("./indexing");
const kurs = require("./kurs");

router.use("/indexing", indexing);
router.use("/kurs", kurs);

module.exports = router;
