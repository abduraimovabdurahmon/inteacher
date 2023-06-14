const { Router } = require("express");
const router = Router();
const User = require("./../../database/models/User");
const protection = require("./../../controllers/protection");


router.get("/:username", protection, async (req, res) => {
    try {
        const { username } = req.params;
        console.log(username);

        const user = await User.findOne({ where: { username } });
        console.log(user);
        if(!user){
            return res.render('pages/errors/404', {
                title: 'Sahifa topilmadi',
                registered: req.cookies.token ? true : false,
                url: process.env.mainURL
            });
        }

        res.render("pages/dashboard/user", {
            title: "Foydalanuvchi",
            registered: req.cookies.token ? true : false,
            url: process.env.mainURL+'/src/dashboard/',
            data:{
                user: user.dataValues
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});





module.exports = router;