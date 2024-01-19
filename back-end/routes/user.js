const { userUpdate, assignedUser } = require("../controllers/userController");
const router = require("express").Router();

router.post("", userUpdate);
router.get("", assignedUser);
module.exports = router;