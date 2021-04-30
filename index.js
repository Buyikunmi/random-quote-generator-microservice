const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const dbDebugger = require("debug")("app:db");
const startupDebugger = require("debug")("app:startup");

// Middlewares;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(cors());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

// mongoose configuration
mongoose
  .connect(config.get("databaseURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(dbDebugger("Connected to MongoDB..."))
  .catch((err) => console.error("An error occured " + err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => startupDebugger("app listening"));
