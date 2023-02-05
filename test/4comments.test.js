process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import fs from "fs";
import path from "path";
import app from "../src/index";
import request from "supertest";
import User from "../src/models/User";
import Blog from "../src/models/Blog";
import Category from "../src/models/Category";
import Comment from "../src/models/Comment";

let should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
const rqst = request(app);

let token = "";
let blogId;
let blogCategoryId = "";

describe("-----Blogs Comments------", async function () {
  beforeEach(async (done) => {
    await Blog.deleteOne({}, done());
  });

  it("/GET returns all blogs comments empty array, and 200 status", async () => {

    await rqst.post("/api/auth/register").send({
      names: "Anathole K",
      password: "1234",
      email: "test@gmail.com",
      roles: "user",
    });

    const loginResponse = await rqst.post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "1234",
    });

    token = loginResponse.body.accessToken;

    const category = await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });

    const blogCategoryId = category.body.result._id;
    const res = await rqst
      .post("/api/blogs/add")
      .set({ token: `Bearer ${token}` })
      .field("Content-Type", "multipart/form-data")
      .field("title", "Blog title")
      .field("description", "Blog description")
      .field("category", blogCategoryId)
      .attach(
        "image",
        fs.readFileSync(path.join(__dirname, "blog_test.png")),
        "blog_test.png"
      );

    blogId = res.body.result._id;

    console.log(blogId);
    const response = await rqst.get(`/api/blogs/comments/${blogId}`);
    expect(response.status).to.eql(200);
  });

  it("/GET all comments, fails with Blog Id bad format 422 status", async () => {
    const response = await rqst.get(`/api/blogs/comments/hfkdgjhkdfhgkdhfgkdf`);
    expect(response.status).to.eql(422);
  });

  it("/GET all comments, fails with Blog Id not exist 204 status", async () => {
    const response = await rqst.get(`/api/blogs/comments/63df644cbcaa1a120c9662db`);
    expect(response.status).to.eql(204);
  });

  it("/POST blog require Authentication -> forbbiden (401)", async () => {
    const response = await rqst
      .post("/api/blogs/add")
      .send({
        title: "Anathole test",
        category: "",
        description: "anatholetes@gmail.com",
        image: "",
        password: "1234",
      })
      .expect((response) => {
        expect(response.status).to.eql(401);
      });
  });

  it("/DELTE blog require Authentication to delete -> forbbiden (401)", async () => {
    const response = await rqst
      .delete("/api/blogs/delete")
      .send({
        title: "Anathole test",
        category: "",
        description: "anatholetes@gmail.com",
        image: "",
        password: "1234",
      })
      .expect((response) => {
        expect(response.status).to.eql(401);
      });
  });



});
