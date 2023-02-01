process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import Blog from "../src/models/Blog";
import seeder from '../src/seeders/userSeeder';
import Category from "../src/models/Category";
import { response } from "express";

let should = chai.should();
chai.use(chaiHttp);
  const expect = chai.expect;

describe(" ----- BLOGs ----- ", function (done) {

  it("/GET returns all blogs, and 200 status", async () => {
    const response = await request(app).get("/api/blogs/all");
    expect(response.status).to.eql(200);
  });

  it("/GET returns single blog, and 200 status", async () => {
    const response = await request(app).get("/api/blogs/63d3fe352b1e86c44fecc430");
    expect(response.status).to.eql(200);
  });


  it("/POST blog require Authentication", async () => {
    const response = await request(app).post("/api/blogs/add").send({
      title: "Anathole test",
      category: "",
      description: "anatholetes@gmail.com",
      image: "",
      password: "1234",
    })
    .expect((response) => {
      expect(response.status).to.eql(401);
    })
  });

  

});


  // it("should pass", async (done) => {
  //   const newBlog = await request(app)
  //     .post("/api/blogs/add")
  //     .set({ token: "" })
  //     .field("Content-Type", "multipart/form-data")
  //     .field("title", "Blog title")
  //     .field("category", "hfjsdhjfhdjfsfsdfsdf")
  //     .attach("image", path.resolve(__dirname, "test/blog_test.png"))
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) {
  //         throw err;
  //         done();
  //       }
  //     });
  // });