const { Router } = require("express");
const User = require("../database/models/User");
const router = Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authController } = require("../controllers/mainControllers");

require("dotenv").config();

// get request
router.get("/", authController, async (req, res) => {
  res.render("pages/auth", {
    title: "Login",
    registered: req.cookies.token ? true : false,
    login: true,
  });
});

// post request
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("pages/auth", {
      errmsg: "Email va parolni to'ldiring!",
      login: true,
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.render("pages/auth", {
      errmsg: "Bunday emailga ega foydalanuvchi mavjud emas!",
      login: true,
    });
  }

  if (!user.confirmed) {
    return res.render("pages/auth", {
      errmsg: "Avval emailni tasdiqlang!",
      login: true,
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.render("pages/auth", {
      errmsg: "Login yoki parol xato!",
      login: true,
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });


  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

  if(user.role === "admin" || user.role === "superAdmin"){
    res.redirect("/admin");
  }
  else{
    res.redirect("/dashboard");
  }
});

module.exports = router;
