const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: String,
  price: Number,
  noOfItems: Number,
  rating: Number,
});

module.exports = mongoose.model("products", ProductSchema);
