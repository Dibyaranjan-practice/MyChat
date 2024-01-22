const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name can't be less than 3 chars"],
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, "Phone number is invalid"],
    maxLength: [10, "Phone number is invalid"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  socket: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;


