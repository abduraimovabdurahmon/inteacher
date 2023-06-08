const { Router } = require("express");
const router = Router();
const { authController } = require("../../controllers/mainControllers");

router.get("/", authController, (req, res) => {
  res.redirect("/enter-email");
});

module.exports = router;
