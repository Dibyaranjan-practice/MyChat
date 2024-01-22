const SocketStatusModel = require("./../models/SocketStatusModel");
const UserController = require("./UserController");

exports.getUserIsActive = async (phone) => {
  const userId = await UserController.getUserIdByPhone(phone);
  return await SocketStatusModel.findOne({ userId }).select("isActive");
};
exports.getUserSocket = async (phone) => {
  const userId = await UserController.getUserIdByPhone(phone);
  return await SocketStatusModel.findOne({ userId }).select("socketId");
};
exports.getUserSocketStatus = async (phone) => {
  const userId = await UserController.getUserIdByPhone(phone);
  return await SocketStatusModel.findOne({ userId }).select(
    "socketId isActive"
  );
};
exports.setUserNewSocketStatus = async (phone, socketId) => {
  const userId = await UserController.getUserIdByPhone(phone);
  await SocketStatusModel.findOneAndUpdate(
    { userId },
    { socketId, isActive: true },
    { upsert: true }
  );
};
exports.setUserActiveStatus = async (socketId) => {
  await SocketStatusModel.findOneAndUpdate({ socketId }, { isActive: false });
};
