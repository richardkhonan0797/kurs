function errorHandler ( err,req,res,next ) {
    if( err.name === 'ValidationError') {
        let errors = [];

        for(let key in err.errors) {
            errors.push(err.errors[key].message)
        };

        let resp = {
            "status": "error",
            "status_code": 400,
            "message": errors,
            "data": {}
        };

        res.status(400).json(resp);
    } else {
        if (err.message === "Kurs not found.") {
            let resp = {
                "status": "error",
                "status_code": 404,
                "message": err.message,
                "data": {}
            };

            res.status(404).json(resp);
        } else {
            let resp = {
                "status": "error",
                "status_code": 400,
                "message": err.message ? err.message : err,
                "data": {}
            };
            
            res.status(400).json(resp);
        }
    }
}

module.exports = { errorHandler }
