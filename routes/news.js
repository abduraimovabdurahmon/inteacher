const { Router } = require("express");
const router = Router();

router.get("/",  (req, res) => { 
  res.render("pages/news", {
    title: "News",
    registered: req.cookies.token ? true : false,
    news: true,
  });
});

module.exports = router;
