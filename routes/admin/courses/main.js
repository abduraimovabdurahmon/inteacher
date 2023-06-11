const { Router } = require("express");
const router = Router();
const { adminController } = require("../../../controllers/mainControllers");
const Course = require("../../../database/models/Course");
const User = require("../../../database/models/User");
require("dotenv").config();

router.get("/", adminController, async (req, res) => {
  const response = await Course.findAll();

  const arr = await response.map((course) => course.dataValues);

  const courses = await Promise.all(
    arr.map(async (course) => {
      const teacher = await User.findOne({ where: { id: course.author } }).then(
        async (data) => await data.dataValues.name
      );
      return {
        id: course.id,
        author: teacher,
        hashtag: course.hashtag,
        name: course.name,
        description: course.description,
        price: course.price,
        image: course.image,
        rating: course.rating,
        ratingCount: course.ratingCount,
        students: course.students,
        lessons: course.lessons,
        duration: course.duration,
      };
    })
  );

  // const teacher = await User.findOne({where: {id: course.author}}).then(data=>data.dataValues.name);

  res.render("pages/admin/courses/main", {
    title: "Admin",
    registered: req.cookies.token ? true : false,
    url: process.env.mainURL + "/src/dashboard",
    data: {
      courses: courses,
    },
  });
});

router.use("/add", require("./add"));

router.use("/delete", require("./delete"));

router.use("/edit/", require("./edit"));

module.exports = router;
