const router = require("express").Router();
const MessageController = require("./../controllers/MessageController");

router.post("/new", MessageController.postAddMessage);
router.post("/all_messages", MessageController.findMessages);

module.exports = router;
