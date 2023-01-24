process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import Blog from "../src/models/Blog";

let should = chai.should();
chai.use(chaiHttp);

describe(" /BLOGS", function (done) {
  const expect = chai.expect;
  beforeEach((done) => {
    //Before each test we empty the database
    Blog.deleteMany({}, (err) => {
      done();
    });
  });

  it("returns all blogs, and 200 status", async () => {
    const response = await request(app).get("/api/blogs/all");
    expect(response.status).to.eql(200);
    expect(response.body.length).to.eq(0);
  });

  // it("returns an authanticated case ", async () => {
  //   const response = await request(app).get("/api/blogs/add");
  //   expect(response.status).to.eql(401);
  //   expect(response.body.length).to.eq(0);
  // });


});

