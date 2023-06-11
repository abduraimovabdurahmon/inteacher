const { Router } = require("express");
const router = Router();
const authController = require("../controllers/protection");
const calendar = require('./dashboard/calendar');
const getUser = require("../utils/getUser");

router.get("/", authController, async (req, res) => { 
  res.render("pages/dashboard/home", {
    title: "Dashboard",
    registered: req.cookies.token ? true : false,
    url: process.env.mainURL+'/src/dashboard/',
    data:{
      user: await getUser(req.cookies.token)
    }
  });
});


// calendar
router.use('/calendar', authController, calendar);









module.exports = router;
