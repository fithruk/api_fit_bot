const { Router } = require("express");

const router = Router();

router.get("/home", (req, res) => {
  res.json("Jopa konya");
});

module.exports = router;
