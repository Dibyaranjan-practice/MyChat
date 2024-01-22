const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    to: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    message: { type: String, require: true },
    timing: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
