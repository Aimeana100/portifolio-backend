process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import request from "supertest";
import Contact from "../src/models/Contact";

let should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

const rqst = request(app);
let token = "";
let allBlogs;

describe("-----CONTACTS------", async function () {
  beforeEach(async (done) => {
    await Contact.deleteOne({}, done());
  });

  afterEach(async (done) => {
    await Contact.deleteOne({}, done());
  });

  // all fields not filled
  it("/POST contacts -> returns one of all fields not passed (400) ", async function () {
    const response = await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
    });
    expect(response.status).to.eql(400);
  });

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

    await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });

    token = loginResponse.body.accessToken;

    const response = await rqst.get("/api/contacts/all").set({
      token: `Bearer ${token}`,
    });
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an("array");
  });

  // GET contacts -> returns Nothing -> empty (204)
  it(" /GET all contacts authenicated user but document is empty-> return (204) ", async function () {
    await Contact.deleteMany({});
    const response = await rqst.get("/api/contacts/all").set({
      token: `Bearer ${token}`,
    });
    expect(response.status).to.eql(204);
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
    const response = await rqst
      .delete("/api/contacts/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        names: "Anathole K contact",
      });

    expect(response.status).to.eql(400);
  });

  //  delete Contact and user authenicated but Id bad format(422)
  it("/DELETE Contact and user authenicated but Id bad format(422)  ", async function () {
    const response = await rqst
      .delete("/api/contacts/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: "123fjsljdfksldfkkjsf758754",
      });
    expect(response.status).to.eql(422);
  });

  //  delete Contact and user authenicated but Id bad format(422)
  it("/DELETE Contact and user authenticated but Id not available in the array  (204)  ", async function () {
    const newContact = await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });

    let contactId = newContact.body.result._id;

    await Contact.deleteOne({ _id: contactId });

    const response = await rqst
      .delete("/api/contacts/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: contactId,
      });
    expect(response.status).to.eql(204);
  });

  //  get Contact and user authenicated but Id not found (204)
  it("/GET Contact and user authenticated but Id not available in the array  (204)  ", async function () {
    const newContact = await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });

    let contactId = newContact.body.result._id;
    await Contact.deleteOne({ _id: contactId });

    const response = await rqst.get(`/api/contacts/${contactId}`).set({
      token: `Bearer ${token}`,
    });
    expect(response.status).to.eql(204);
  });

  //  delete Contact and user authenicated and success fully deleted(200)
  it("/DELETE Contact by Id and user authenticated return  (200)  ", async function () {
    const newContact = await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });

    let contactId = newContact.body.result._id;

    const response = await rqst
      .delete("/api/contacts/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: contactId,
      });
    expect(response.status).to.eql(200);
  });

  // GET contacts -> returns all contacts (200)
  it(" /GET Single contact authenicated user-> return (200) ", async function () {
    await rqst.post("/api/contacts/add").send({
      names: "Anathole K contact",
      email: "test@gmail.com",
      description: "content of contact",
    });

    allBlogs = await rqst.get("/api/contacts/all").set({
      token: `Bearer ${token}`,
    });

    const response = await rqst
      .get(`/api/contacts/${allBlogs.body[0]._id}`)
      .set({
        token: `Bearer ${token}`,
      });
    expect(response.status).to.eql(200);
  });

  // GET contacts with mistaken route -> returns all contacts (404)
  it(" /GET contact bad route ", async function () {
    const response = await rqst.get(`/api/contacts/`).set({
      token: `Bearer ${token}`,
    });
    expect(response.status).to.eql(404);
  });

  // GET contacts -> returns all contacts (422)
  it(" /GET a contact qith Id of bad format i.e : fhsjfdhfksjdhfkdsjfhksdhfksdhfkdf", async function () {
    const response = await rqst
      .get(`/api/contacts/fhsjfdhfksjdhfkdsjfhksdhfksdhfkdf`)
      .set({
        token: `Bearer ${token}`,
      });
    expect(response.status).to.eql(422);
  });
});
