require("dotenv").config();
// Packages import
const axios = require('axios');
const cheerio = require('cheerio');

// Models import
const Kurs = require('../models/kurs');


class indexingController {
    static async getIndexing ( req, res, next ) {
        try {
            var kurs = [];
            let date = new Date();
            date.setHours( date.getHours() + 7);

            const response = await axios.get(process.env.SCRAPING_URL);

            let $ = cheerio.load(response.data);

            $("tr", ".m-table-kurs > tbody").each( (i, elm) => {
                let dict = {
                    "symbol": $(elm).children().first().text().trim(),
                    "erate": {
                        "jual": parseFloat($(elm).children().eq(1).first().text().trim().replace(",", ".")),
                        "beli": parseFloat($(elm).children().eq(2).first().text().trim().replace(",", ".")),
                    },
                    "tt": {
                        "jual": parseFloat($(elm).children().eq(3).first().text().trim().replace(",", ".")),
                        "beli": parseFloat($(elm).children().eq(4).first().text().trim().replace(",", ".")),
                    },
                    "notes": {
                        "jual": parseFloat($(elm).children().eq(5).first().text().trim().replace(",", ".")),
                        "beli": parseFloat($(elm).children().eq(6).first().text().trim().replace(",", ".")),
                    },
                    "date": date.toISOString().slice(0, 10)
                }

                kurs.push(dict);
            });

            let to_be_saved = []

            for ( const item of kurs ) {
                let data = await Kurs.exists({"symbol": item["symbol"], "date": item["date"]});

                if ( !data ) {
                    to_be_saved.push(item);
                }
            }

            await Kurs.insertMany(to_be_saved);

            let resp = {
                "status": "success",
                "status_code": 201,
                "message": "Indexing success.",
                "data": {},
            }

            return res.status(201).json(resp);
        } catch ( error ) {
            next(error)
        }
    }
}

module.exports = indexingController;