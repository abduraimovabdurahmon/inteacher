const { Router } = require("express");
const User = require("../database/models/User");
const { authController } = require("../controllers/mainControllers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = Router();

router.get("/", authController, async (req, res) => {
  res.render("pages/auth", {
    title: "Verify",
    verify: true,
  });
});

router.post("/", authController, async (req, res) => {
  const code = req.body.code;
  const email = req.cookies.email;

  if (!code || !email) {
    return res.render("pages/auth", { errmsg: "Server error!", verify: true });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("pages/auth", {
        errmsg: "Server error!",
        verify: true,
      });
    }

    const { code: confirmCode } = await jwt.verify(
      user.confirmCode,
      process.env.JWT_SECRET
    );

    if (confirmCode !== code) {
      return res.render("pages/auth", {
        errmsg: "Xato kod kitirildi!",
        verify: true,
      });
    }

    await User.update(
      { confirmed: true, confirmCode: null },
      { where: { email } }
    );
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
