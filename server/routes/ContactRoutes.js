const route = require("express").Router();
const ContactController = require("./../controllers/ContactController");

route.post("/create", ContactController.postCreateContact);
route.post("/findByPhone", ContactController.getContactsByPhone);

module.exports = route;
