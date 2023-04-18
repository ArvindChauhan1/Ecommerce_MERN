const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log(process.env.DB_URL)
  mongoose.connect(process.env.DB_URL, {}).then((data) => {
    console.log(`MongDB connected with server : ${data.connection.host}`);
  })
};

module.exports = connectDatabase;
