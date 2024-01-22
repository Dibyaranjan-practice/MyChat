const mongoose = require("mongoose");

const SocketStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, require: true, unique: true },
  socketId: { type: String, require: true, unique: true },
  isActive: { type: Boolean, default: true },
});

const SocketStatusModel = mongoose.model("SocketStatus", SocketStatusSchema);

module.exports = SocketStatusModel;
