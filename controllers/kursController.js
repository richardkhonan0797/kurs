// Models import
const Kurs = require('../models/kurs');


class kursController {
    static async deleteKurs ( req, res, next ) {
        try {

            let del = await Kurs.deleteMany({"date": req.params["date"]});

            if ( !del["deletedCount"] ) throw new Error(`No kurs data at date ${req.params["date"]}.`);

            let resp = {
                "status": "success",
                "status_code": 200,
                "message": `Date ${req.params["date"]} kurs deleted.`,
                "data": {}
            }

            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    }

    static async getAllKursFromDate (req, res, next) {
        try {

            let data = await Kurs.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(req.query["startdate"]),
                            $lte: new Date(req.query["enddate"])
                        }
                    }
                },
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                date: "$date",
                                format: "%Y-%m-%d"
                            }
                        }
                    }
                },
                {
                    $unset: ["_id", "__v"]
                }
            ]).exec();

            let resp = {
                "status": "success",
                "status_code": 200,
                "message": "OK",
                "data": data
            };

            res.status(200).json(resp);
        } catch ( error ) {
            next(error)
        }
    }

    static async getByCurrencyAndDate ( req, res, next ) {
        try {

            let data = await Kurs.aggregate([
                {
                    $match: {
                        $and: [
                            { symbol: req.params["symbol"] },
                            {
                                date: {
                                    $gte: new Date(req.query["startdate"]),
                                    $lte: new Date(req.query["enddate"])
                                }
                            }
                        ]
                    }
                },
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$date"
                            }
                        }
                    }
                },
                {
                    $unset: ["_id", "__v"]
                }
            ]).exec();

            let resp = {
                "status": "success",
                "status_code": 200,
                "message": "OK",
                "data": data
            };

            res.status(200).json(resp);
        } catch ( error ) {
            next(error);
        }
    }

    static async postKurs ( req, res, next ) {
        try {

            const isExist = await Kurs.find({
                $and: [
                    {"symbol": req.body["symbol"]},
                    {"date": req.body["date"]}
                ]
            });

            if ( isExist.length > 0 ) {
                throw new Error(`Kurs at date ${req.body["date"]} exists.`);
            }

            await Kurs.create(req.body);

            let resp = {
                "status": "success",
                "status_code": 201,
                "message": "OK",
                "data": req.body
            };

            res.status(201).json(resp);
        } catch ( error ) {
            next(error);
        }
    }

    static async putKurs ( req, res, next ) {
        try {

            const update = await Kurs.findOneAndUpdate(
                {
                    $and: [
                        {"symbol": req.body["symbol"]},
                        {"date": req.body["date"]}
                    ]
                },
                req.body,
                {new: true}
            );

            if ( !update ) throw new Error("Kurs not found.");

            let resp = {
                "status": "success",
                "status_code": 201,
                "message": "OK",
                "data": req.body
            };

            res.status(201).json(resp);
        } catch ( error ) {
            next(error);
        }
    }
}

module.exports = kursController;