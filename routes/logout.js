const { Router } = require("express");

const router = Router();

// get request
router.get("/", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
