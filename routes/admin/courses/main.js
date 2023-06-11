const { Router } = require("express");
const router = Router();
const { adminController } = require("../../../controllers/mainControllers");
const Course = require("../../../database/models/Course");
const User = require("../../../database/models/User");
require("dotenv").config();
const getUser = require("../../../utils/getUser");


router.get("/", adminController, async (req, res) => {
  
  const courses = await Course.findAll().then((courses) => {
    return courses.map((course) => course.dataValues);
  })

  const teachers = await User.findAll({ where: { role: "teacher" } }).then((teachers) => {
    return teachers.map((teacher) => teacher.dataValues);
  })



  res.render("pages/admin/courses/main", {
    title: "Kurslar",
    registered: req.cookies.token ? true : false,
    url: process.env.mainURL + "/src/dashboard",
    data: {
      courses: courses,
      teachers: teachers,
      user: await getUser(req.cookies.token)
    },
  });
});

router.use("/add", require("./add"));

router.use("/delete", require("./delete"));

router.use("/edit/", require("./edit"));

module.exports = router;
