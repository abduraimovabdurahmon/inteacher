const { Router } = require("express");
require("dotenv").config();

const router = Router();

router.get("/", (req, res) => {
  req.cookies.token
    ? res.render("pages/home2", {
        title: "English Ninja - Home",
        registered: req.cookies.token ? true : false,
        home: true,
        url: process.env.mainURL,
      })
    : res.render("pages/home1", {
        title: "English Ninja - Home",
        registered: req.cookies.token ? true : false,
        home: true,
        url: process.env.mainURL,
      });
});

module.exports = router;
