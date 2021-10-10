const mongoose = require("mongoose");

const kursSchema = new mongoose.Schema({
    "symbol": {
        "type": String,
        "uppercase": true,
        "maxLength": 3,
        "minLength": 3,
        "enum": {
            "values": [
                "USD", "SGD", "EUR", "AUD", "DKK", "SEK", "CAD", "CHF", "NZD", "GBP", "HKD", "JPY", "SAR", "CNH", "MYR", "THB"
            ],
            "message": "Please input correct currency symbol."
        }
    },
    "erate": {
        "jual": {
            "type": Number,
            "max": 100000
        },
        "beli": {
            "type": Number,
            "max": 100000
        }
    },
    "tt": {
        "jual": {
            "type": Number,
            "max": 100000
        },
        "beli": {
            "type": Number,
            "max": 100000
        },
    },
    "notes": {
        "jual": {
            "type": Number,
            "max": 100000
        },
        "beli": {
            "type": Number,
            "max": 100000
        }
    },
    "date": {
        "type": Date
    }
});

const Kurs = mongoose.model("Kurs", kursSchema);

module.exports = Kurs;
