const { Router } = require("express");
const router = Router();

router.get("/",  (req, res) => { 
  res.render("pages/lessons", {
    title: "Lessons",
    registered: req.cookies.token ? true : false,
    lessons: true,
    url: process.env.mainURL,
  });
});

module.exports = router;
