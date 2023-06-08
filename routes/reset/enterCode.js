const Router = require("express").Router;
const router = Router();
const { authController } = require("../../controllers/mainControllers");
const User = require("../../database/models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", authController, (req, res) => {
  res.render("pages/auth", {
    title: "Reset password",
    enterCode: true,
  });
});

router.post("/", authController, async (req, res) => {
  try {
    const email = req.cookies.email;
    const code = req.body.code;

    if (!email || !code) {
      return res.render("pages/auth", {
        errmsg: "Server error!",
        enterCode: true,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("pages/auth", {
        errmsg: "Server error!",
        enterCode: true,
      });
    }

    const { code: resetPasswordCode } = await jwt.verify(
      user.resetPasswordCode,
      process.env.JWT_SECRET
    );

    if (resetPasswordCode !== code) {
      return res.render("pages/auth", {
        errmsg: "Xato kod kitirildi!",
        enterCode: true,
      });
    }

    // token 5 minut
    const token = await jwt.sign({ code }, process.env.JWT_SECRET, {
      expiresIn: 300000,
    });

    res.cookie("change", token, { httpOnly: true, maxAge: 300000 });

    res.cookie("email", email);

    return res.redirect("/new-password");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
