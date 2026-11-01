const express = require("express");
const cors = require("cors");
const { connectDB, disconnectDB } = require("./configs/db");
const bcrypt = require("bcryptjs");
const Users = require("./models/Users");


const app = express();
const port = process.env.PORT || 8001;

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



// API for SIGNUP

app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    Users.create(userDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "User Created Successfully" });
      }
    });
  }
});

// API for LOGIN

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});


if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
