const {Router} = require('express');
const router = Router();
const getUser = require("./../../../utils/getUser");
const User = require("./../../../database/models/User");

router.get("/", async (req, res)=>{
    try {
        res.render("pages/dashboard/profile/update", {
            title: "Profilni taxrirlash",
            registered: req.cookies.token ? true : false,
            url: process.env.mainURL+'/src/dashboard/',
            data:{
                user: await getUser(req.cookies.token)
            }
        });
    } catch (error) {
        console.log(error);
    }
});





router.post("/", async (req, res)=>{
    try {
        const {name, username, phone, location} = req.body;
        const id = await getUser(req.cookies.token).then(user=>user.id);

        // validate
        const result = await User.findOne({where: {username}});

        if(result && result?.dataValues?.id !== id){
            return res.json({
                success: false,
                message: "Bunday username avval ro'yxatdan o'tgan!"
            })
        }
        
        const user = await User.findOne({where:{id}});

        user.name  =  name?name:user.name;
        user.username  =  username?username:user.username;
        user.phone  =  phone?phone:user.phone;
        user.location  =  location?location:user.location;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Ma\'lumotlar muvaffaqiyatli yangilandi'
        })

    } catch (error) {
        console.log(error);
    }
})






module.exports = router;