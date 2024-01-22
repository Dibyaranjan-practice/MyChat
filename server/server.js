//imports (third party, default)
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//custom files
require("./db");
const UserRoutes = require("./routes/UserRoutes");
const ContactRoutes = require("./routes/ContactRoutes");
const MessageRoutes = require("./routes/MessageRoutes");

//constants
const { corsOptions } = require("./constants");

//app configs
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/user", UserRoutes);
app.use("/contact", ContactRoutes);
app.use("/message", MessageRoutes);

//server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log("server running on " + PORT));

module.exports = server;
