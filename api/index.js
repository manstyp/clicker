const express = require("express");
const app = express();
const PORT = 3003;
const path = require("path");
const viewsDirectory = path.join(process.cwd(), "views");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const session = require("express-session");
const bodyParser = require("body-parser");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("views", viewsDirectory);
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.redirect("/game");
});

app.get("/game", (req, res) => {
  res.render("game");
});
