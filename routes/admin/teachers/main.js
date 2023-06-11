const { Router } = require("express");
const router = Router();
const { adminController } = require("../../../controllers/mainControllers");
const Course = require("../../../database/models/Course");
const User = require("../../../database/models/User");
require("dotenv").config();
const getUser = require("../../../utils/getUser");


router.get("/", adminController, async (req, res) => {
    try {


        const response = await User.findAll({ where: { role: "teacher" } });
        const teachers = await response.map((teacher) => teacher.dataValues);


        res.render("pages/admin/teachers/main", {
            title: "Teachers",
            registered: req.cookies.token ? true : false,
            url: process.env.mainURL + "/src/dashboard",
            data: {
                teachers: teachers,
                user: await getUser(req.cookies.token)
            }
        })
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;