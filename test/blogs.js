process.env.NODE_ENV = "test";

//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import Blog from "../src/models/Blog";
import Category from "../src/models/Category";

let should = chai.should();
chai.use(chaiHttp);

describe(" ++++++ BLOGS ++++++", function (done) {
  const expect = chai.expect;
  let dynamic__response;

  beforeEach((done) => {
    Category.deleteMany({}, (err) => {
      Blog.deleteMany({}, (err) => {
        done();
      });
    });
  });

  it("returns all blogs, and 200 status", async () => {
    const response = await request(app).get("/api/blogs/all");
    expect(response.status).to.eql(200);
    expect(response.body.length).to.eq(0);
  });

  it("/POST blog require Authentication", async () => {
    const response = await request(app).post("/api/blogs/add").send({
      title: "Anathole test",
      category: "",
      description: "anatholetes@gmail.com",
      image: "",
      password: "1234",
    });
    expect(response.status).to.eql(401);
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

});
