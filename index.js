const express = require("express");
const port = 2600;
const app = express();
const cors = require("cors");
require("./DB/Connection");
const users = require("./Model/UserSchema");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

// api routes
app.get("/", (req, res) => {
  res.send("Ajay Giri Goswami");
});

// // api routs for user
// app.post("/contact", async (req, res) => {
//   const { fname, lname, email, mobile, message } = req.body;
//   try {
//     const olduser = await users.findOne({ email: email });
//     if (olduser) {
//       res.json("existed");
//     } else {
//       users.insertMany({
//         fname,
//         lname,
//         email,
//         mobile,
//         message,
//       });
//       res.status(201).json({ status: 201 });
//     }
//   } catch (error) {
//     console.log(error + "data");
//   }
// });

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ajay124767@gmail.com",
    pass: "ezmf comm qsqx xqsc",
  },
});

//Contat user details
app.post("/Contact", async (req, res) => {
  const { fname, lname, email, mobile, message } = req.body;

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      const mailOptions = {
        from: "ajay124767@gmail.com",
        to: email,
        subject: "Thanks for Your Response",
        text: "Your Response Has Been Submitted",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error" + error);
        } else {
          // console.log("Email sent" + info.response);
          res.json("existed");
        }
      });
      res.json("existed");
    } else {
      const finalUser = new users({
        fname,
        lname,
        email,
        mobile,
        messages: { message: message },
      });

      const storeData = await finalUser.save();

      const mailOptions = {
        from: "ajay124767@gmail.com",
        to: email,
        subject: "Thanks for Your Response",
        text: "Your Response Has Been Submitted",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error" + error);
        } else {
          // console.log("Email sent" + info.response);
          res.status(201).json({ status: 201 });
        }
      });
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    // console.log("catch error", error);
    res.json("error");
  }
});

// Server is Start
app.listen(port, () => {
  console.log("Server Run");
});
