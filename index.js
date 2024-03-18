const express = require("express");
const port = 2600;
const app = express();
const cors = require("cors");
require("./DB/Connection");
const nodemailer = require("nodemailer");
const users = require("./Model/UserSchema");

app.use(cors());
app.use(express.json());

// api routes
app.get("/", (req, res) => {
  res.send("Ajay Giri Goswami");
});

// api routs for user
app.post("/contact", async (req, res) => {
  const { fname, lname, email, mobile, message } = req.body;
  const data = {
    fname,
    lname,
    email,
    mobile,
    message,
  };
  users
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(409).send({ error: "Email already exists" });
      } else {
        users
          .insertMany([data]) // change this line
          .then(() => res.status(201).json({ error: "submitted" }))
          .catch((error) => res.json(error));
      }
    })
    .catch((err) => console.log(err));
});

// Server is Start
app.listen(port, () => {
  console.log("Server Run");
});
