//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import User from "../src/models/User";

let should = chai.should();
chai.use(chaiHttp);



describe("POST /register a User", function () {
    const expect = chai.expect;

    beforeEach((done) => {
      //Before each test we empty the database
      User.deleteMany({}, (err) => {
        done();
      });
    });

    it("returns a user created with status 201 and success message.", async function () {

      const response = await request(app)
        .post("/api/auth/register")
        .send({ names: "Anathole test", email: "anatholetes@gmail.com", password: "1234" });
         expect(response.status).to.eql(201);
         expect(response.body).to.be.an("object");
         expect(response.body).to.have.property("success");
  
    //   const attributes = response.body.data.attributes;
      // expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
      // expect(attributes.kilometers).to.eql(8692.066508240026);
      // expect(attributes.miles).to.eql(5397.239853492001);
      // expect(attributes.nautical_miles).to.eql(4690.070954910584);
    });
  });
  