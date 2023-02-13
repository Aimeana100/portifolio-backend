process.env.NODE_ENV = "test";
//Require the dev-dependencies
import app from "../src/index";
import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import Category from "../src/models/Category";
import User from "../src/models/User";

let should = chai.should();
chai.use(chaiHttp);

const rqst = request(app);

let categoryId;

describe("----- BLOG CATEGORY ------", async function () {
  const expect = chai.expect;
  let token;

  before(async (done) => {
    await Category.deleteOne({}, done());
  });

  rqst;

  it("/POST -> returns not authenticated (401) ", async function () {
    const response = await rqst.post("/api/categories/add").send({
      name: "Software Development",
    });
    expect(response.status).to.eql(401);
  });

  it("/POST returns not all fields filled (400) ", async () => {
    await rqst.post("/api/auth/register").send({
      names: "Anathole Test",
      email: "test@gmail.com",
      password: "1234",
    });

    const login = await rqst.post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "1234",
    });

    token = login.body.accessToken;

    const response = await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({});
    expect(response.status).to.eql(400);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.be.a("string");
    expect(response.body.message).to.eql("category name is required");
  });

  // will create a new blog category
  it("/POST returns Category created (201) ", async () => {
    const response = await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });
    expect(response.status).to.eql(201);
    expect(response.body).to.be.an("object");
  });

  it("/GET returns all blog categories (200)", async function () {
    await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });
    const response = await rqst.get("/api/categories/all");
    expect(response.status).to.eql(200);
  });

  // will fail to update a blog category due to missing token (401)
  it("/PUT returns Category not updated no expired token required (401) ", async () => {
    const response = await rqst.put("/api/categories/update").send({
      name: "Software Development",
    });
    expect(response.status).to.eql(401);
  });

  // will  update a blog category  (200)
  it("/PUT returns successful update ", async () => {
    const category = await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });

    categoryId = category.body.result._id;

    const response = await rqst
      .put("/api/categories/update")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: categoryId,
        name: "Software Development",
      });
    expect(response.status).to.eql(200);
  });

  // will fail to update a blog category due Category not found (204)
  it("/PUT returns  Category ID not found -> not updated ", async () => {
    const response = await rqst
      .put("/api/categories/update")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: "63d9cc7d5edb78550c1473cf",
        name: "Software Development",
      });
    expect(response.status).to.eql(204);
  });

  // will fail to update a blog category due Category ID not passed throught body (400)
  it("/PUT returns  Category ID not passed via body params -> not updated ", async () => {
    const response = await rqst
      .put("/api/categories/update")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });
    expect(response.status).to.eql(400);
  });

  // Get a single category successfully
  it("/GET returns single blog category  (200)", async function () {
    let categoryId;

    while (!categoryId) {
      const category = await rqst
        .post("/api/categories/add")
        .set({
          token: `Bearer ${token}`,
        })
        .send({
          name: "Software Development",
        });
      categoryId = category.body.result._id;
    }

    const response = await rqst.get(`/api/categories/${categoryId}`);
    expect(response.status).to.eql(200);
  });

  // will fail to Delete a blog category due Category ID not passed throught body (400)
  it("/DELETE returns fail -> not user Authenticated (401)", async () => {
    const response = await rqst.delete("/api/categories/delete").send({
      name: "Software Development",
    });
    expect(response.status).to.eql(401);
  });

  // will fail to Delete a blog category due Category ID not passed throught body (400)
  it("/DELETE returns  Category ID not  passed via body params -> not deleted (400)", async () => {
    const response = await rqst
      .delete("/api/categories/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });
    expect(response.status).to.eql(400);
  });

  // will fail to Delete a blog category due Category ID not passed throught body (422)
  it("/DELETE not deleted due to  Category ID bad format (422)", async () => {
    const response = await rqst
      .delete("/api/categories/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: "hfjsfsfshdfjshdkfsdfsdffgf",
        name: "Software Development",
      });
    expect(response.status).to.eql(422);
  });

  // will fail to Delete a blog category due Category by Id not found (204)
  it("/DELETE returns no category with the Id (204)", async () => {
    const response = await rqst
      .delete("/api/categories/delete")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: "63bf8a9ebb9f502223bb30ad",
        name: "Software Development",
      });
    expect(response.status).to.eql(204);
  });

  // will  update a blog category  (200)
  it("/POST returns successful update (200)", async () => {
    const category = await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });

    categoryId = category.body.result._id;

    const response = await rqst
      .put("/api/categories/update")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        id: categoryId,
        name: "Software Development",
      });
    expect(response.status).to.eql(200);
  });

  // will delete a blog category (200)
  it("/DELETE will delete a blog category (200)", async () => {
    const category = await rqst
      .post("/api/categories/add")
      .set({
        token: `Bearer ${token}`,
      })
      .send({
        name: "Software Development",
      });

    categoryId = category.body.result._id;

    if (categoryId) {
      const response = await rqst
        .delete("/api/categories/delete")
        .set({
          token: `Bearer ${token}`,
        })
        .send({
          id: categoryId,
        });
      expect(response.status).to.eql(200);
    }
  });

  // Get a single category will fail no category found (204)
  it("/GET returns single blog category not exist (204) ", async function () {
    const response = await rqst.get(`/api/categories/63e61a111ce50137bcc268d0`);
    expect(response.status).to.eql(204);
  });

  // Get a single category will fail by Category Id bad format (422)
  it("/GET returns single blog category of bad format -> fail (422) ", async function () {
    const response = await rqst.get(`/api/categories/dfgdfhjghdjgnhgdjfhgd`);
    expect(response.status).to.eql(422);
  });

  // Get a blog category from wrong route
  it("/GET returns route not found (404) ", async function () {
    const response = await rqst.get(`/api/categories/`);
    expect(response.status).to.eql(404);
  });

  after(async (done) => {
    await User.deleteOne({}, done());
  });
});
