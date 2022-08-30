const { setAvatar, getAllUsers } = require("../controllers/userControllers");
const router = require("express").Router();

router.post("/setAvatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers);

module.exports = router;
