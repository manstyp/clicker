const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3003;
const path = require("path");
const viewsDirectory = path.join(process.cwd(), "views");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("views", viewsDirectory);
app.set("view engine", "pug");

const uri =
  "mongodb+srv://mankri752:userPassword!!!@clicker.2uzk8ms.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri).then(
  (client) => {
    console.log("Mongoose is connected :D");
  },
  (reason) => {
    console.log(`Failed due to ${reason}`);
  }
);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/game", (req, res) => {
  res.render("game", {});
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("register", (req, res) => {
  res.render("register");
});
