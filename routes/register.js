const { Router } = require("express");
const router = Router();
const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { registerValidate } = require("../utils/validate");
const { authController } = require("../controllers/mainControllers");

require("dotenv").config();

// transporter gmail
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// generate code for email
const generateCode = () => {
  // generate random number 5 digits
  const code = Math.floor(10000 + Math.random() * 90000);
  return code.toString();
};

// get request
router.get("/", authController, async (req, res) => {
  res.render("pages/auth", {
    title: "Register",
    registered: req.cookies.token ? true : false,
    register: true,
  });
});

// post request
router.post("/", authController, registerValidate, async (req, res) => {
  const { name, email, password } = req.body;
  

  try {
    // find user
    const user = await User.findOne({ where: { email } });

    if (user && user.confirmed) {
      return res.render("pages/auth", {
        errmsg: "Bunday email avval ro'yxatdan o'tgan!",
        register: true,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // send email
    const code = generateCode();

    const confirmCode = jwt.sign({ code }, process.env.JWT_SECRET, {
      expiresIn: 300000,
    });

    const beautyHtml = `
            <div style="width: 100%; height: 100vh; background-color: #f5f5f5; display: flex; justify-content: center; align-items: center;">
                <div style="width: 500px; height: 500px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 20px;">
                    <h1 style="text-align: center; font-size: 30px; font-weight: 500; margin-bottom: 20px;">Tasdiqlash kodi</h1>
                    <p style="text-align: center; font-size: 20px; font-weight: 500; margin-bottom: 20px;">Sizning tasdiqlash kodingiz: <span style="font-weight: 700;">${code}</span></p>
                </div>
            </div>
        `;

    await transporter
      .sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Tasdiqlash kodi",
        html: beautyHtml,
      })
      .catch((err) => {
        console.log(err);
      });

    if (user && !user.confirmed) {
      // user update
      await user.update({
        name,
        email,
        password: hashedPassword,
        confirmCode,
      });

      await user.save();
    } else {
      // create user
      await User.create({
        name,
        email,
        password: hashedPassword,
        confirmCode,
      });
    }

    res.cookie("email", email, {
      httpOnly: true,
    });

    res.redirect("/verify");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
