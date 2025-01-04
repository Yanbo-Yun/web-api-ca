const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, 
  },
  movieId: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
