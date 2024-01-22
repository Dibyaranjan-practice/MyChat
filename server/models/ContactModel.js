const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
  contactId: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
  contactName: { type: String, require: true },
});
const ContactModel = mongoose.model("Contact", Contact);

exports.getContactByPhone = async (phone) => {
  return await ContactModel.findOne({ phone });
};

module.exports = ContactModel;
