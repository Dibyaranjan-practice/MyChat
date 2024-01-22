const ContactModel = require("./../models/ContactModel");
const UserModel = require("./../models/UserModel");

//creating new contact
exports.postCreateContact = async (req, res) => {
  console.log("postCreateContact");
  console.log(req.body);
  const userId = await UserModel.findOne({
    phone: req.body.userphone,
  }).select("_id");
  const contactId = await UserModel.findOne({
    phone: req.body.contactphone,
  }).select("_id");
  if (!contactId) return res.status(404).json("User not yet registered in WA");
  ContactModel.updateOne(
    { userId, contactId },
    {
      $set: {
        contactName: req.body.contactName,
      },
    },
    { upsert: true }
  )
    .then(() => res.status(201).json("Contact Created"))
    .catch((error) => {
      res.status(400).json("Contact creation failed" + error);
    });
};

//finding all contacts of a person using phone number
exports.getContactsByPhone = async (req, res) => {
  const userId = await UserModel.findOne({ phone: req.body.phone }).select(
    "_id"
  );
  const all_friends = await ContactModel.find({ userId })
    .select("contactId contactName")
    .populate("contactId");
  const contacts = {};
  all_friends.forEach(
    (contact) => (contacts[contact.contactId.phone] = contact.contactName)
  );
  res.status(200).json(contacts);
};
