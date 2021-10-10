// Packages import
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Models import
const Kurs = require('../../models/kurs');


const expect = chai.expect;
chai.use(chaiHttp);



describe("Get All Kurs by Date", () => {

    before((done) => {
        let fixture = [
            {
                "symbol": "USD",
                "erate": {
                    "jual": "1111",
                    "beli": "1111"
                },
                "tt": {
                    "jual": "1111",
                    "beli": "1111"
                },
                "notes": {
                    "jual": "1111",
                    "beli": "1111"
                },
                "date": "2021-10-08"
            },
            {
                "symbol": "SGD",
                "erate": {
                    "jual": "1111",
                    "beli": "1111"
                },
                "tt": {
                    "jual": "1111",
                    "beli": "1111"
                },
                "notes": {
                    "jual": "1111",
                    "beli": "1111"
                },
                "date": "2021-10-08"
            }
        ];

        Kurs.insertMany(fixture, (err) => {});
        done()
    });

    after((done) => {
        Kurs.deleteMany({}, (err) => {});
        done();
    });

    it("Should return a list of kurs from date range.", (done) => {
        chai
            .request(app)
            .get("/api/kurs?startdate=2021-10-08&enddate=2021-10-09")
            .then( res => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data.length).to.equal(2);
                done();
            })
            .catch(done);
        }
    );

    it("Should return an empty list.", (done) => {
        chai
            .request(app)
            .get("/api/kurs?startdate=2020-10-08&enddate=2020-10-09")
            .then( res => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data.length).to.equal(0);
                done();
            })
            .catch(done);
    });

    it("Please input valid date format ( YYYY-MM-DD ).", (done) => {
        chai
            .request(app)
            .get("/api/kurs?startdate=400&enddate=2020-10-09")
            .then( res => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("Please input valid date format ( YYYY-MM-DD ).");
                done();
            })
            .catch(done);
    });
});