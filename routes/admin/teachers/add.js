const {Router} = require('express');
const router = Router();
const {adminController} = require("./../../../controllers/mainControllers");
const getUser = require("./../../../utils/getUser");
const User = require("./../../../database/models/User");


router.post("/", adminController, async (req, res)=>{
    try {
        const {username} = req.body;
        
        // username == username
        // role !== teacher
        // role !== admin

        const user = await User.findOne({where:{username}});

        if(!user || user?.dataValues?.role === 'teacher' || user?.dataValues?.role === 'admin'){
            return res.json({
                success: false,
                message: "Bunday foydalanuvchi mavjud emas!"
            })
        }

        user.role = 'teacher';

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Muvaffaqiyatli qo\'shildi'
        });

    } catch (error) {
        console.log(error);
    }
})


module.exports = router;