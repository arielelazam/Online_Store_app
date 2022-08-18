const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 256,
  },
  phone: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  creatorName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  creatorAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  image: {
    type: String,
    maxlength: 1024,
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  likes: {
    type: Array,
    default: [],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema, "products");

exports.Product = Product;
