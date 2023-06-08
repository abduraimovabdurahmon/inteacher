const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => { 
  res.render("pages/contact", {
    title: "Contact us",
    registered: req.cookies.token ? true : false,
    contact: true,
    url: process.env.mainURL,
});
});

module.exports = router;
