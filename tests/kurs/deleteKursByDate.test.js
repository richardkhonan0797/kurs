// Packages import
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Models import
const Kurs = require('../../models/kurs');


const expect = chai.expect;
chai.use(chaiHttp);



describe("Delete Kurs by Date", () => {

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

    it("Should return message 'Date 2021-10-08 kurs deleted'.", (done) => {
        chai
            .request(app)
            .delete("/api/kurs/2021-10-08")
            .then( res => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Date 2021-10-08 kurs deleted.");
                done();
            })
            .catch(done);
        }
    );

    it("Should return error message 'No kurs data at date 2020-10-08.'.", (done) => {
        chai
            .request(app)
            .delete("/api/kurs/2020-10-08")
            .then( res => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("No kurs data at date 2020-10-08.");
                done();
            })
            .catch(done);
    });

    it("Should return 'Please input valid date format ( YYYY-MM-DD ).'", (done) => {
        chai
            .request(app)
            .delete("/api/kurs/asdf")
            .then( res => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("Please input valid date format ( YYYY-MM-DD ).");
                done();
            })
            .catch(done);
    });
});