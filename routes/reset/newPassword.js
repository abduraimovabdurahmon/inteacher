const Router = require("express").Router;
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const router = Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const change = req.cookies.change;
    const email = req.cookies.email;
    if (!change || !email) {
      return res.render("pages/auth", {
        errmsg: "Server error!",
        newPassword: true,
      });
    }

    const { code } = jwt.verify(change, process.env.JWT_SECRET);
    if (!code) {
      return res.render("pages/auth", {
        errmsg: "Kod muddati tugagan!",
        newPassword: true,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("pages/auth", {
        errmsg: "Bunday foydalanuvchi topilmadi!",
        newPassword: true,
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

    return res.render("pages/auth", {
      title: "Reset password",
      newPassword: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const change = req.cookies.change;
    const email = req.cookies.email;
    const password = req.body.password;

    if (!change || !email || !password) {
      return res.render("pages/auth", {
        errmsg: "Server error!",
        newPassword: true,
      });
    }

    const { code } = jwt.verify(change, process.env.JWT_SECRET);
    if (!code) {
      return res.render("pages/auth", {
        errmsg: "Kodni amal qilish muddati o'tib ketgan!",
        newPassword: true,
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("pages/auth", {
        errmsg: "Bunday foydalanuvchi topilmadi!",
        newPassword: true,
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await user.update({
      password: hashedPassword,
      resetPasswordCode: null,
      confirmCode: null,
    });

    res.clearCookie("change");
    res.clearCookie("email");

    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
