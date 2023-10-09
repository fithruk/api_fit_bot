const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Trainings");
});

module.exports = router;
