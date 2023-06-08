
const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
    res.render("pages/dashboard/calendar", {
        title: "Dashboard",
        registered: req.cookies.token ? true : false,
        url: process.env.mainURL+'/src/dashboard/',
    })
});


module.exports = router;
