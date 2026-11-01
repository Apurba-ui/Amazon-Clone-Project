const request = require("supertest");
const app = require("../server"); // Path to your main file
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../configs/db");

beforeAll(async () => {
  // Connect to a test database
  const connection_url = "mongodb://localhost:27017/ecommerce_test";
  await connectDB(connection_url);
});

afterAll(async () => {
  // Clean up
  await disconnectDB();
});

describe("API Endpoints", () => {
  test("GET / - Home Page", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Home Page");
  });

  test("POST /auth/signup - User Signup", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ email: "test@example.com", password: "password123", fullName: "Test User" });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User Created Successfully");
  });

  test("POST /auth/login - User Login", async () => {
    // Create user first
    await request(app).post("/auth/signup").send({
      email: "login@example.com",
      password: "password123",
      fullName: "Login Test",
    });

    // Attempt login
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "login@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe("login@example.com");
  });

  test("POST /products/add - Add Product", async () => {
    const product = {
      title: "Product 1",
      imageURL: "test",
      price: 123,
      rating: 123,
    };
    const response = await request(app).post("/products/add").send(product);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      title: "Product 1",
      imageURL: "test",
      price: 123,
      rating: 123,
    });
  });

  test("GET /products/get - Get Products", async () => {
    const response = await request(app).get("/products/get");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("POST /payment/create - Create Payment", async () => {
    const response = await request(app).post("/payment/create").send({ amount: 100 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("clientSecret");
  });

  test("POST /orders/add - Add Order", async () => {
    const order = {
      basket: [{ product: "Product 1", quantity: 1 }],
      price: 100,
      email: "order@example.com",
      address: "123 Test St",
    };
    const response = await request(app).post("/orders/add").send(order);
    expect(response.statusCode).toBe(201);
  });

  test("POST /orders/get - Get Orders", async () => {
    const response = await request(app).post("/orders/get").send({ email: "order@example.com" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
