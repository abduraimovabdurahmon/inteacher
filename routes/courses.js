const { Router } = require("express");
const router = Router();
require("dotenv").config();
const Course = require("../database/models/Course");
const User = require("../database/models/User");

router.get("/", (req, res) => { 
  res.render("pages/courses", {
    title: "Course list",
    courses: true,
    registered: req.cookies.token ? true : false,
    url: process.env.mainURL,
});
});





module.exports = router;
