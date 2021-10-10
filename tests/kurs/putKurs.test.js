// Packages import
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Models import
const Kurs = require('../../models/kurs');


const expect = chai.expect;
chai.use(chaiHttp);



describe("Put Kurs", () => {

    before((done) => {
        let data = {
            "symbol": "USD",
            "erate": {
                "jual": 1111.22,
                "beli": 1111.22
            },
            "tt": {
                "jual": 1111,
                "beli": 1111
            },
            "notes": {
                "jual": 1111,
                "beli": 1111
            },
            "date": "2021-10-08"
        };

        Kurs.create(data, (err) => {});
        done();
    })

    after((done) => {
        Kurs.deleteMany({}, (err) => {});
        done();
    });

    it("Should return message 'OK' and kurs data.", (done) => {

        let data = {
            "symbol": "USD",
            "erate": {
                "jual": 1111.22,
                "beli": 1111.22
            },
            "tt": {
                "jual": 2222,
                "beli": 1111
            },
            "notes": {
                "jual": 1111,
                "beli": 1111
            },
            "date": "2021-10-08"
        };

        chai
            .request(app)
            .put("/api/kurs")
            .send(data)
            .then( res => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.data.symbol).to.equal("USD");
                expect(res.body.data.tt.jual).to.equal(2222);
                expect(res.body.data.date).to.equal("2021-10-08");
                done();
            })
            .catch(done);
        }
    );

    it("Should return an error message 'Kurs not found.'", (done) => {

        let data = {
            "symbol": "USD",
            "erate": {
                "jual": 1111.22,
                "beli": 1111.22
            },
            "tt": {
                "jual": 1111,
                "beli": 1111
            },
            "notes": {
                "jual": 1111,
                "beli": 1111
            },
            "date": "2020-10-08"
        };

        chai
            .request(app)
            .put("/api/kurs")
            .send(data)
            .then( res => {
                expect(res.body.message).to.equal("Kurs not found.");
                expect(res.statusCode).to.equal(404);
                done();
            })
            .catch(done);
        }
    );

    it("Should return 'Please input correct currency symbol.'", (done) => {

        let data = {
            "symbol": "ZZZ",
            "erate": {
                "jual": 1111,
                "beli": 1111
            },
            "tt": {
                "jual": 1111,
                "beli": 1111
            },
            "notes": {
                "jual": 1111,
                "beli": 1111
            },
            "date": "2021-10-08"
        };

        chai
            .request(app)
            .post("/api/kurs")
            .send(data)
            .then( res => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("Please input correct currency symbol.");
                done();
            })
            .catch(done);
    });

    it("Should return 'Please input valid date format ( YYYY-MM-DD ).'", (done) => {
        let data = {
            "symbol": "USD",
            "erate": {
                "jual": 1111.22,
                "beli": 1111.22
            },
            "tt": {
                "jual": 1111,
                "beli": 1111
            },
            "notes": {
                "jual": 1111,
                "beli": 1111
            },
            "date": "asdf"
        };

        chai
            .request(app)
            .post("/api/kurs")
            .send(data)
            .then( res => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("Please input valid date format ( YYYY-MM-DD ).");
                done();
            })
            .catch(done);
    });
    
    it("Should return 'Please input correct price.'", (done) => {
        let data = {
            "symbol": "USD",
            "erate": {
                "jual": "asdf",
                "beli": 1111.22
            },
            "tt": {
                "jual": 1111,
                "beli": 1111
            },
            "notes": {
                "jual": 1111,
                "beli": 1111
            },
            "date": "2021-10-08"
        };

        chai
            .request(app)
            .post("/api/kurs")
            .send(data)
            .then( res => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("Please input correct price.");
                done();
            })
            .catch(done);
    });
});