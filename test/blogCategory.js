//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import Category from "../src/models/Category";
import User from "../src/models/User";

let should = chai.should();
chai.use(chaiHttp);

let token;

describe("----- BLOG CATEGORY ------", async function () {
  const expect = chai.expect;

  beforeEach(async (done) => {
    await Category.deleteOne({},
      await User.deleteOne({}, done())
      );
   
  });

  await it("/GET returns all blog categories ", async function () {
    const response = await request(app).get("/api/categories/all");
    expect(response.status).to.eql(200);
  });

  await it("/POST returns not authenticated (401) ", async function () {
    const response = await request(app).post("/api/categories/add").send({
      name: "Software Development",
    });
    expect(response.status).to.eql(401);
  });

  it("/POST returns not all fields filled (400) ", async function () {
    await request(app).post("/api/auth/register").send({
      names: "Anathole K",
      password: "1234",
      email: "test@gmail.com",
      roles: "user",
    });

    const login = await request(app).post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "1234",
    });

    // console.log(login.body);

    const response = await request(app)
      .post("/api/categories/add")
      .set({
        token: `Bearer ${login.body.accessToken}`,
      })
      .send({});

    expect(response.status).to.eql(400);
    expect(response.body).to.be.an("object");
  });

  await it("/POST returnsCategory created (201) ", async function () {
    await request(app).post("/api/auth/register").send({
      names: "Anathole K",
      password: "1234",
      email: "test@gmail.com",
      roles: "user",
    });

    const login = await request(app).post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "1234",
    });

    const response = await request(app)
      .post("/api/categories/add")
      .set({
        token: `Bearer ${login.body.accessToken}`,
      })
      .send({
        name: "Software Development",
      });
    expect(response.status).to.eql(201);
  });

  //   it("returns user with the same email exist (409) ", async function () {
  //     console.log('register a new user');
  //     const user = await request(app)
  //       .post("/api/auth/register")
  //       .send({
  //         names: "Anathole K",
  //         password: "1234",
  //         email: "test@gmail.com",
  //         roles: "user",
  //       }, console.log('created'));

  //     console.log(user.body)

  //     if (user) {
  //       const response = await request(app)
  //         .post("/api/auth/register")
  //         .send({
  //           names: "Anathole Karinganire",
  //           password: "1234",
  //           email: "test@gmail.com",
  //           roles: "user",
  //         });
  //       expect(response.status).to.eql(409);
  //       expect(response.body).to.be.an("object");

  //     }
  //   });

  //   it(" Login return one of email or password not passed ahead with request (400)", async function () {
  //     await request(app)
  //     .post("/api/auth/register")
  //     .send({
  //       names: "Anathole K",
  //       password: "1234",
  //       email: "test@gmail.com",
  //       roles: "user",
  //     });

  //     const response = await request(app)
  //       .post("/api/auth/login")
  //       .send({
  //         email: "test@example.com",
  //       });
  //     expect(response.status).to.eql(400);
  //   });

  //   it(" Login return unregistred a user (401) ", async function () {
  //     await request(app)
  //     .post("/api/auth/register")
  //     .send({
  //       names: "Anathole K",
  //       password: "1234",
  //       email: "test@gmail.com",
  //       roles: "user",
  //     });
  //     const response = await request(app)
  //       .post("/api/auth/login")
  //       .send({
  //         password: "1234",
  //         email: "anonimous@gmail.com",
  //       });
  //     expect(response.status).to.eql(401);
  //   });

  //   it("Login with invalid credenstials ie: password incorrect (200) ", async function () {
  //     await request(app)
  //     .post("/api/auth/register")
  //     .send({
  //       names: "Anathole K",
  //       password: "1234",
  //       email: "test@gmail.com",
  //       roles: "user",
  //     });

  //     const response = await request(app)
  //       .post("/api/auth/login")
  //       .send({
  //         email : "test@gmail.com",
  //         password: "12345678",
  //       });
  //     token = response.body.accessToken;
  //     expect(response.status).to.eql(401);
  //     expect(response.body).to.be.an("object");
  //   });

  //   it("Authenticcate a user and get a token to use for the rest of the APIs (200) ", async function () {

  //     await request(app)
  //     .post("/api/auth/register")
  //     .send({
  //       names: "Anathole K",
  //       password: "1234",
  //       email: "test@gmail.com",
  //       roles: "user",
  //     });

  //     const response = await request(app)
  //       .post("/api/auth/login")
  //       .send({
  //         email: "test@gmail.com",
  //         password: "1234",
  //       });
  //     token = response.body.accessToken;
  //     expect(response.status).to.eql(200);
  //     expect(response.body).to.be.an("object");
  //   });

  //   it(" GET users without access priviledge 401", async function () {
  //     await request(app)
  //     .post("/api/auth/login")
  //     .send({
  //       email: "test@gmail.com",
  //       password: "1234",
  //     });

  //     const response = await request(app).get("/api/users/all");
  //     expect(response.status).to.eql(401);
  //   });

  //   it(" GET users with access priviledge 200", async function () {
  //     await request(app)
  //     .post("/api/auth/register")
  //     .send({
  //       names: "Anathole K",
  //       password: "1234",
  //       email: "test@gmail.com",
  //       roles: "user",
  //     });

  //     const loginResponse = await request(app)
  //     .post("/api/auth/login")
  //     .send({
  //       email: "test@gmail.com",
  //       password: "1234",
  //     });

  //     const response = await request(app)
  //       .get("/api/users/all")
  //       .set({
  //         token: `Bearer ${loginResponse.body.accessToken}`,
  //       });
  //     expect(response.status).to.eql(200);
  //     expect(response.body).to.be.an("array");
  //   });

  // afterEach(async (done) => {
  //   await Category.deleteOne({});
  //   await User.deleteOne({}, done());
  // });
  
});
