const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
});

export const Quote = mongoose.model("Quote", quoteSchema);
