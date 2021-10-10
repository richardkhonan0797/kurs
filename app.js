// Packages import
require("dotenv").config();
const express = require("express");
const { connectMongoose } = require("./config/mongoose");

// Router import
const indexRouter = require("./routes/index");

// Error handler import
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

mongoUri = {
    "start": process.env.PROD_DB,
    "dev": process.env.DEV_DB,
    "test": process.env.TEST_DB
}

connectMongoose(mongoUri[process.env.NODE_ENV]);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);
app.use(errorHandler);

module.exports = app;
