const express = require("express");
const cors = require("cors");
const { connectDB, disconnectDB } = require("./configs/db");
const Products = require("./models/Products");
const {startConsumer} = require('./services/KafkaConsumer');


const app = express();
const port = process.env.PORT || 8002;

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

app.get("/", (req, res) => res.status(200).send("Home Page"));

startConsumer();

// add product
app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>", productDetail);

  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
