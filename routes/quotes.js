const express = require("express");
const router = express.Router();
const quotes = require("./quotes.json");

router.get("/api/quotes", (req, res) => {
  res.send("hello world");
});

module.exports = router;
