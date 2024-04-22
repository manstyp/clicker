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
app.use(
  session({
    secret: "hej",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

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
  res.render("game", {
    username: req.session.username,
  });
});

app.get("/home", async (req, res) => {
  if (!req.session.userId && process.env.ENVIRONMENT != "DEV") {
    res.render("home");
  } else {
    let userId, user;
    if (process.env.ENVIRONMENT == "DEV") {
      userId = 0;
      user = {
        username: "Admin",
      };
    } else {
      userId = req.session.userId;
      user = await User.findById(userId);
    }

    res.redirect("/game");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/authenticate-register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    req.session.userId = newUser._id;
    // req.session.username = newUser.username;
    // req.session.password = newUser.password;

    res.status(201).redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/authenticate-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.userId = user._id;
      res.status(201).redirect("/home");
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

  req.session.username = username;
});
