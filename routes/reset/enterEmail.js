const { Router } = require("express");
const router = Router();
const User = require("../../database/models/User");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authController } = require("../../controllers/mainControllers");

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

router.get("/", authController, (req, res) => {
  res.render("pages/auth", {
    title: "Reset password",
    enterEmail: true,
  });
});

router.post("/", authController, async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.render("pages/auth", {
        errmsg: "Emailni kitiring!",
        enterEmail: true,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("pages/auth", {
        errmsg: "Bunday emailga ega foydalanuvchi mavjud emas!",
        enterEmail: true,
      });
    }

    // send email
    const code = generateCode();

    const beautyHtml = `
        <div style="width: 100%; height: 100vh; background-color: #f5f5f5; display: flex; justify-content: center; align-items: center;">
            <div style="width: 500px; height: 500px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 20px;">
                <h1 style="text-align: center; font-size: 30px; font-weight: 500; margin-bottom: 20px;">Parolni o'zgartirish uchun</h1>
                <p style="text-align: center; font-size: 20px; font-weight: 500; margin-bottom: 20px;">Sizning tasdiqlash kodingiz: <span style="font-weight: 700;">${code}</span></p>
            </div>
        </div>
        `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Parolni yangilash uchun kod: ",
      html: beautyHtml,
    });

    const resetPasswordCode = jwt.sign({ code }, process.env.JWT_SECRET, {
      expiresIn: 300000,
    });

    // save code to database
    user.resetPasswordCode = resetPasswordCode;

    await user.save();

    // save email to cookie
    res.cookie("email", email);
    // redirect to enter code page
    res.redirect("/enter-code");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
