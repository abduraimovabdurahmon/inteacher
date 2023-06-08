const { Router } = require("express");
const router = Router();
const Course = require("../database/models/Course");
const User = require("../database/models/User");



router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const course = await Course.findOne({ where: { id: req.params.id } }).then(
    async (data) => await data.dataValues
  );

  const teacher = await User.findOne({ where: { id: course.author } }).then(
    async (data) => await data.dataValues
  );


  res.render("pages/course-details", {
    title: "Course",
    course: true,
    registered: req.cookies.token ? true : false,
    url: process.env.mainURL,
    data: {
      course,
      teacher,
    }
  });
});

module.exports = router;
