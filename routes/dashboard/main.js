const { Router } = require("express");
const router = Router();
const protection = require("../../controllers/protection");
const getUser = require("../../utils/getUser");

router.get("/", protection, async (req, res) => { 
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
router.use('/calendar', protection, require('./calendar'));

// profile
router.use('/profile', protection, require('./profile/main'));










module.exports = router;
