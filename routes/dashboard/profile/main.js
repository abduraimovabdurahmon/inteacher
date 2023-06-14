const { Router } = require("express");
const router = Router();
const protection = require("./../../../controllers/protection");
const getUser = require("./../../../utils/getUser");


router.get("/", protection, async (req, res) => {

    res.render("pages/dashboard/profile/main", {
        title: "Profilim",
        registered: req.cookies.token ? true : false,
        url: process.env.mainURL+'/src/dashboard/',
        data:{
            user: await getUser(req.cookies.token)
        }
    });
});


router.use('/update', protection, require('./update'));




module.exports = router;