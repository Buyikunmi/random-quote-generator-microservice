const express = require("express");
// const mongoose = require("mongoose");
const config = require("config");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Load Quotes JSON Api

const quotesJSON = require("./routes/quotes.json");
const app = express();

const dbDebugger = require("debug")("app:db");
const startupDebugger = require("debug")("app:startup");

// const quotes = require("./routes/quotes");
// Middlewares;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(cors());

app.set("view engine", "pug");
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

// mongoose configuration
// mongoose
//   .connect(config.get("databaseURI"), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(dbDebugger("Connected to MongoDB..."))
//   .catch((err) => console.error("An error occured " + err));

async function shuffleArray(arr) {
  const result = await arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/api/quotes", (req, res) => {
  startupDebugger(quotesJSON);
  //   const result = ;
  res.json(quotesJSON);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => startupDebugger("app listening"));
