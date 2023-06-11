const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = Router();
const { adminController } = require("../../../controllers/mainControllers");
const User = require("../../../database/models/User");
const Course = require("../../../database/models/Course");
const fs = require("fs");
require("dotenv").config();
const getUser = require("../../../utils/getUser");


const minPath = path.join(__dirname, "../../../public/uploads/courses/");

router.get("/:id", adminController, async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findOne({ where: { id: id } }).then(
            (data) => data.dataValues
        );
        const teacher = await User.findOne({ where: { id: course.author } }).then(
            (data) => data.dataValues.name
        );
        const teachers = await User.findAll({ where: { role: "teacher" } }).then(
            (data) => data.map((item) => item.dataValues)
        );

        res.render("pages/admin/courses/edit", {
            title: "Edit course",
            registered: req.cookies.token ? true : false,
            url: process.env.mainURL + "/src/dashboard",
            data: {
                course,
                teacher,
                teachers,
                user: await getUser(req.cookies.token)
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// upload image name = uuid
const upload = multer({
    // if file empty
    fileFilter: (req, file, cb) => {
        if (!file) {
            cb(null, false);
        } else {
            cb(null, true);
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, minPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, uuidv4() + ext);
        },
    }),
});

// update course
router.post(
    "/:id",
    adminController,
    upload.single("image"),
    async (req, res) => {
        try {
            const {author,name,description,price,lessons,duration,hashtag,rating,ratingCount,} = req.body;

            const fileName = req.file?.filename;

            const id = req.params.id;

            const course = await Course.findOne({ where: { id: id } }).then((data) => data.dataValues);

            if(fileName){
                const oldImage = course.image;
                console.log(oldImage);
                try {
                    await fs.unlinkSync(minPath +oldImage.split("/")[3]);
                } catch (error) {}
            }

            const updateData = {};
            if(author) updateData.author = author;
            if(name) updateData.name = name;
            if(description) updateData.description = description;
            if(price) updateData.price = price;
            if(lessons) updateData.lessons = lessons;
            if(duration) updateData.duration = duration;
            if(hashtag) updateData.hashtag = hashtag;
            if(rating) updateData.rating = rating;
            if(ratingCount) updateData.ratingCount = ratingCount;
            if(fileName) updateData.image = "/uploads/courses/" + fileName;

            await Course.update(updateData, { where: { id: id } });

            res.redirect("/admin/courses");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server xatosi" });
        }
    }
);

module.exports = router;
