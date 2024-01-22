const MessageModel = require("./../models/MessageModel");
const UserController = require("./../controllers/UserController");

exports.postAddMessage = async (req, res) => {
  const sender = await UserController.getUserIdByPhone(req.body.sender);
  const receiver = await UserController.getUserIdByPhone(req.body.receiver);
  MessageModel.create({
    from: sender["_id"],
    to: receiver["_id"],
    message: req.body.message,
  })
    .then(() => {
      res.status(200).json("message sent successfully");
    })
    .catch(() => {
      res.status(400).json("message sending failed");
    });
};

//find top 10 messages
exports.findMessages = async (req, res) => {
  const receiver = await UserController.getUserIdByPhone(req.body.to);
  const sender = await UserController.getUserIdByPhone(req.body.from);

  const all_messages = await MessageModel.find({
    $or: [
      {
        from: sender,
        to: receiver,
      },
      {
        from: receiver,
        to: sender,
      },
    ],
  })
    .select("to from timing message")
    .populate([
      { path: "to", select: "phone" },
      { path: "from", select: "phone" },
    ]);

  return res.status(200).json(all_messages);
};
