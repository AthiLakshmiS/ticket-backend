const { ticketUpdate, taskAll } = require("../controllers/ticketController");
const router = require("express").Router();

router.post("", ticketUpdate);
router.get("", taskAll);

module.exports = router;