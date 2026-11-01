const express = require("express");
const cors = require("cors");
const { connectDB, disconnectDB } = require("./configs/db");
const Orders = require("./models/Orders");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
);

const {sendMessage} = require('./shared/kafka/kafkaProducer');
const {createTopics} = require('./shared/kafka/kafkaAdmin');

const app = express();
const port = process.env.PORT || 8003;

// Middlewares
app.use(express.json());
app.use(cors())

// connection url

// const connection_url =
// "mongodb+srv://abhijeetbasfore:abhijeet123@cluster0.k5leesh.mongodb.net/?retryWrites=true&w=majority";

// const connection_url = "mongodb://localhost:27017/ecommerce_web_app";
const connection_url = process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce_web_app";
connectDB(connection_url);
// API

//Call kafka admin to create topics
createTopics();

app.get("/", (req, res) => res.status(200).send("Home Page"));



// API for PAYMENT

app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request recieved for this ruppess", total);

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// API TO add ORDER DETAILS

app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };
  sendMessage('order-created', [orderDetail]);
  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({message: err.message});
    } else {
      console.log("order added to database >> ", result);
      res.status(201).send({message : "order created"});
    }
  });
});

app.post("/orders/get", (req, res) => {
  const email = req.body.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
