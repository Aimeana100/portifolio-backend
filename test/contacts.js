import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import User from "../src/models/User";
import Contact from "../src/models/Contact";

let should = chai.should();
chai.use(chaiHttp);
const rqst = request(app);
let token;

describe("-----CONTACTS------", async function () {
  const expect = chai.expect;

  beforeEach(async (done) => {
    await User.deleteMany({}, await Contact.deleteOne({}, done()));
  });

  afterEach(async (done) => {
    await User.deleteMany({}, await Contact.deleteOne({}, done()));
  });

  // all fields not filled
  it("/POST contacts -> returns one of all fields not passed (400) ", async function () {
    const response = await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
    });
    expect(response.status).to.eql(400);
  });

  // all fields not with server error
  // it("/POST contacts -> returns one of all fields not passed (500) ", async function () {
  //   const response = await rqst.post("/api/contacts/add").send({
  //     names: "Anathole K {} [] `` # @ contact",
  //     email: "test@gmail.com",
  //     description: "content of contact",      });
  //   expect(response.status).to.eql(500);
  // });

  // all files filled
  it("/POST contacts -> returns created (201) ", async function () {
    const response = await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });
    expect(response.status).to.eql(201);
  });

  // GET contacts -> returns not authenticated user(400)
  it("/GET all contacts -> returns  not authenticated (401) ", async function () {
    const response = await rqst.get("/api/contacts/all");
    expect(response.status).to.eql(401);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("message");
  });

  // GET contacts -> returns all contacts (200)
  it(" /GET all contacts authenicated user-> return (200) ", async function () {
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

    const response = await rqst
      .get("/api/contacts/all")
      .set({
        token: `Bearer ${loginResponse.body.accessToken}`,
      });
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an("array");
  });

  // ------------- update -------------
  //  delete  not authenicated user(401)
  it("/DELETE contacts -> returns Not authenticated (401) ", async function () {
    const response = await rqst.delete("/api/contacts/delete").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });
    expect(response.status).to.eql(401);
  });

  //  delete Contact and user authenicated but Id not passed (400)
  it("/DELETE contacts and user authenicated -> returns Id not passed (400) ", async function () {
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

    const response = await rqst
      .delete("/api/contacts/delete")
      .set({
        token: `Bearer ${loginResponse.body.accessToken}`,
      })
      .send({
        names: "Anathole K contact",
      });

    expect(response.status).to.eql(400);
  });


  //  delete Contact and user authenicated but Id bad format(422)
  it("/DELETE Contact and user authenicated but Id bad format(422)  ", async function () {
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

    console.log(loginResponse.body);

    const response = await rqst
      .delete("/api/contacts/delete")
      .set({
        token: `Bearer ${loginResponse.body.accessToken}`,
      })
      .send({
        id: "123fjsljdfksldfjsf758754",
        names: "Anathole K contact",
        email: "test@gmail.com",
        description: "content of contact",
      });
    expect(response.status).to.eql(422);
  });


    // GET contacts -> returns all contacts (200)
    it(" /GET Single contact authenicated user-> return (200) ", async function () {

      let allBlog;
      await rqst.post("/api/contacts/add").send({
        names: "Anathole K contact",
        email: "test@gmail.com",
        description: "content of contact",
      });


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

      allBlog = await rqst
      .get("/api/contacts/all")
      .set({
        token: `Bearer ${loginResponse.body.accessToken}`,
      });

      const response = await rqst
        .get(`/api/contacts/${allBlog.body[0]._id}`)
        .set({
          token: `Bearer ${loginResponse.body.accessToken}`,
        });
      expect(response.status).to.eql(200);
    });
  

});
