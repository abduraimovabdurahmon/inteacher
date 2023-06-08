const { Router } = require("express");
const router = Router();
const authController = require("../controllers/protection");
const calendar = require('./dashboard/calendar');

router.get("/", authController, (req, res) => { 
  res.render("pages/dashboard/home", {
    title: "Dashboard",
    registered: req.cookies.token ? true : false,
    url: process.env.mainURL+'/src/dashboard/',
  });
});


// calendar
router.use('/calendar', authController, calendar);









module.exports = router;
