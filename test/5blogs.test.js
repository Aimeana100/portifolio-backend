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

let should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

const rqst = request(app);

let token = "";
let blogId;
let blogCategoryId = "";

describe("-----Blogs------", async function () {
  beforeEach(async (done) => {
    await Blog.deleteOne({}, done());
  });

  // afterEach(async (done) => {
  //   await Blog.deleteOne({}, done());
  // });

 

  it("/GET returns all blogs, and 200 status", async () => {
    const response = await rqst.get("/api/blogs/all");
    expect(response.status).to.eql(200);
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

  it("/PUT update blog require Authentication to update -> forbbiden (401)", async () => {
    const response = await rqst
      .put("/api/blogs/update")
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
 
  it("/POST blog require both fields filled no title and description  -> returns  (400)", async function () {
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

    blogCategoryId = category.body.result._id;

    const res = await rqst
      .post("/api/blogs/add")
      .set({ token: `Bearer ${token}` })
      .field("Content-Type", "multipart/form-data")
      .field("category", blogCategoryId)
      .attach(
        "image",
        fs.readFileSync(path.join(__dirname, "blog_test.png")),
        "blog_test.png"
      );
    expect(res.status).to.eql(400);
  });

  // delete blog fails no Id passed in the body
  it("/DELTE blog fails no Id passed via body (400)", async () => {
    const response = await rqst
      .delete("/api/blogs/delete")
      .set({ token: `Bearer ${token}` })
      .field("Content-Type", "multipart/form-data")
      .field("title", "Blog title")
      .expect((response) => {
        expect(response.status).to.eql(400);
      });
  });
  

  it("/POST create new blog require both fields filled  -> returns  (201) ", async function () {
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
    expect(res.status).to.eql(201);
  });

  it("/GET  single blog, and returns 200 status", async () => {
    const res = await rqst
      .post("/api/blogs/add")
      .set("Content-Type", "application/x-www-form-urlencoded")
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
    const response = await rqst.get(`/api/blogs/${blogId}`);
    expect(response.status).to.eql(200);
  });

  // create new category fails bad category Id format -> returns  (422)
  it("/POST not created blog category ID bad format -> status 422", async () => {
    const res = await rqst
      .post("/api/blogs/add")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set({ token: `Bearer ${token}` })
      .field("Content-Type", "multipart/form-data")
      .field("title", "Blog title")
      .field("description", "Blog description")
      .field("category", "fdsfjshjfhjsdfjfhsjdfjsd")
      .attach(
        "image",
        fs.readFileSync(path.join(__dirname, "blog_test.png")),
        "blog_test.png"
      );
    expect(res.status).to.eql(422);
  });

    // update blog, fails bad category Id format -> returns  (422)
    it("/POST not created blog category ID bad format -> status 422", async () => {
      const res = await rqst
        .put("/api/blogs/add")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set({ token: `Bearer ${token}` })
        .field("Content-Type", "multipart/form-data")
        .field("title", "Blog title")
        .field("id", "63df644cbcaa1a120c9662db")
        .field("description", "Blog description")
        .field("category", "fdsfjshjfhjsdfjfhsjdfjsd")
        .attach(
          "image",
          fs.readFileSync(path.join(__dirname, "blog_test.png")),
          "blog_test.png"
        );
      expect(res.status).to.eql(422);
    });
  


      // add blog Id not found
      it("/POST create blog category ID not found 204 ", async () => {
        await Category.deleteOne({});
        const res = await rqst
          .post("/api/blogs/update")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set({ token: `Bearer ${token}` })
          .field("id", blogId)
          .field("Content-Type", "multipart/form-data")
          .field("title", "Blog title")
          .field("description", "Blog description")
          .field("category", '63df644cbcaa1a120c9662db')
          .attach(
            "image",
            fs.readFileSync(path.join(__dirname, "blog_test.png")),
            "blog_test.png"
          );
        expect(res.status).to.eql(204);
      });


      // Update blog Id not found
      it("/PUT not updated blog category ID not found 204 ", async () => {
        await Category.deleteOne({});
        const res = await rqst
          .put("/api/blogs/update")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set({ token: `Bearer ${token}` })
          .field("id", blogId)
          .field("Content-Type", "multipart/form-data")
          .field("title", "Blog title")
          .field("description", "Blog description")
          .field("category", blogCategoryId)
          .attach(
            "image",
            fs.readFileSync(path.join(__dirname, "blog_test.png")),
            "blog_test.png"
          );
        expect(res.status).to.eql(204);
      });
    
  // update no Blog Id passed
  it("/PUT update  blog fail blog Id not passed via body params  -> returns  (400) ", async function () {
    const res = await rqst
      .put("/api/blogs/update")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set({ token: `Bearer ${token}` })
      .field("Content-Type", "multipart/form-data")
      .field("title", "Blog title edited")
      .field("description", "Blog description edited")
      .field("category", blogCategoryId)
      .attach(
        "image",
        fs.readFileSync(path.join(__dirname, "blog_test.png")),
        "blog_test.png"
      );
    expect(res.status).to.eql(400);
  });

    
  it("/POST will update blog returns (200) status", async () => {

    const category = await rqst
    .post("/api/categories/add")
    .set({
      token: `Bearer ${token}`,
    })
    .send({
      name: "Software Development",
    });

  const blogCategoryId = category.body.result._id;

  setTimeout(async () => {
    const newBlog = await rqst
      .post("/api/blogs/add")
      .set("Content-Type", "application/x-www-form-urlencoded")
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
    blogId = newBlog.body.result._id;

    console.log(blogId)
    const res = await rqst
      .put("/api/blogs/update")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set({ token: `Bearer ${token}` })
      .field("Content-Type", "multipart/form-data")
      .field("id", blogId)
      .field("title", "Blog title")
      .field("description", "Blog description")
   
    expect(res.status).to.eql(200);
    
  }, 1000);
  });

  after(async (done) => {
    await User.deleteOne({}, done());
  });

});
