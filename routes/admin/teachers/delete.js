const {Router} = require('express');
const router = Router();
const {adminController} = require("./../../../controllers/mainControllers");
const getUser = require("./../../../utils/getUser");
const User = require("./../../../database/models/User");


router.post("/", adminController, async (req, res)=>{
    try {
        const {id} = req.body;
        
        // username == username
        // role !== teacher
        // role !== admin

        const user = await User.findOne({where:{id}});

        user.role = 'student';

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Muvaffaqiyatli o\'chirildi!'
        });

    } catch (error) {
        res.status(200).json({
            success: false,
            message: 'Serverda xatolik'
        });
        console.log(error);
    }
})


module.exports = router;