const { Router } = require("express");
const path = require("path");
const router = Router();
const fs = require("fs");
const { adminController } = require("../../../controllers/mainControllers");
const User = require("../../../database/models/User");
const Course = require("../../../database/models/Course");
require("dotenv").config();

const mainPath = path.join(__dirname, "../../../public/");


router.delete("/:id", adminController, async (req, res) => {
    try {   
        
        const id = req.params.id;
        const course = await Course.findOne({where: {id: id}}).then(data=>data.dataValues);
        const image = course.image;
        // detete image

        if(!image){
            res.redirect("/admin/courses");
        }


        try {
            await fs.unlinkSync(mainPath + image);
        } catch (error) {}

        // delete course
        await Course.destroy({where: {id: id}});
        res.status(200).json({message: "Course deleted"});

    } catch (error) {
        res.status(500).json({message: "Server xatosi"});
        console.log(error);
    }
});






module.exports = router;