const { setAvatar } = require("../controllers/userControllers");
const router = require("express").Router();

router.post("/setAvatar/:id", setAvatar);

module.exports = router;
