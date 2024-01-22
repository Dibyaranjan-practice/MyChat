const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongo connection successful");
  })
  .catch((error) => {
    console.log(error);
    console.log("mongo connection failed");
  });
