const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = Router();
const { adminController } = require("../../../controllers/mainControllers");
const User = require("../../../database/models/User");
const Course = require("../../../database/models/Course");
require("dotenv").config();

const minPath = path.join(__dirname, "../../../public/uploads/courses/");





router.get("/", adminController,  async (req, res) => {  
  try {
    const response = await User.findAll({where: {role: 'teacher'}});
    const teachers = response.map(teacher => {
      return {
        id: teacher.id,
        name: teacher.name
      }
    });

    res.render("pages/admin/courses/add", {
      title: "Admin",
      registered: req.cookies.token ? true : false,
      url: process.env.mainURL + "/src/dashboard/",
      data: {
        authors: teachers
      }
    });
  } catch (error) {
    console.log(error);
  }
});





// upload image name = uuid
const upload = multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, minPath);
      },
      filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, uuidv4() + ext);
      }
  })
})



router.post("/", adminController, upload.single('image'), async (req, res) => {
  try {

    const { author, name, description, price, lessons, duration, hashtag } = req.body;
    const fileName = req.file.filename;
    if(!author || !hashtag) return res.redirect("/admin/courses/add");
    

    // create new course
    await Course.create({
      author, name, description, price, lessons, duration, hashtag,
      image: `/uploads/courses/${fileName}`
    });

    res.redirect("/admin/courses");

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
