const mongoose = require("mongoose");

// Create a schema for Restaurants
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    imageURL: {
      type: String,
    },
    location: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default : 0,
      required: true
    },
  }, { timestamps: true })

// Create a model for Restaurants
exports.Restaurant = mongoose.model(
  "restaurant", restaurantSchema
);
