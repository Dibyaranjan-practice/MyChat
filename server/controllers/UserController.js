const bcrypt = require("bcrypt");
const UserModel = require("./../models/UserModel");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res) => {
  const user = await UserModel.findOne({ phone: req.body.phone });
  if (!user) return res.status(403).json("failed");
  try {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = await jwt.sign(req.body, process.env.JSON_KEY);
      return res
        .status(200)
        .json({ token, username: user.name, phone: user.phone });
    }
    return res.status(403).json("failed");
  } catch (error) {
    return res.status(500).json("Server error. Please try again");
  }
};

exports.postSignup = async (req, res) => {
  const user = await UserModel.findOne({ phone: req.body.phone });
  if (user) {
    return res.status(409).json("phone nubmer already exists");
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  UserModel.create(req.body)
    .then(() => {
      res.status(201).json("success");
    })
    .catch((error) => res.status(403).json("failed" + error));
};

exports.getUserIdByPhone = async (phone) => {
  return await UserModel.findOne({ phone }).select("_id");
};
