// Packages import
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Models import
const Kurs = require('../../models/kurs');


const expect = chai.expect;
chai.use(chaiHttp);



describe("Get indexing from BCA", () => {

    afterEach((done) => {
        Kurs.deleteMany({}, (err) => {});
        done();
    });

    it("Should return message 'Indexing success.'.", (done) => {
        chai
            .request(app)
            .get("/api/indexing")
            .then( res => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.message).to.equal("Indexing success.");
                done();
            })
            .catch(done);
        }
    ).timeout(10000);
});