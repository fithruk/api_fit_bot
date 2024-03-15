const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  console.log(req.cookies);
  res.send("jopa");
});

module.exports = router;
