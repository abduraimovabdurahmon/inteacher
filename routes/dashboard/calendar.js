const { Router } = require('express');
const router = Router();
const authController = require("../../controllers/protection");
const getUser = require("../../utils/getUser");

router.get("/", authController, async (req, res) => {
    res.render("pages/dashboard/calendar", {
        title: "Dashboard",
        registered: req.cookies.token ? true : false,
        url: process.env.mainURL+'/src/dashboard/',
        data:{
            user: await getUser(req.cookies.token)
        }
    })
});


module.exports = router;
