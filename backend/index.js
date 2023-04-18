const express = require("express");
const app = require("./app");
const connectDatabase = require("./config/database");

// handeling uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`)
  console.log("Shutting down the server due to uncaughtException")
  process.exit(1);
})

// config
require("dotenv").config({ path: __dirname + "/config/config.env" });

// connecting databse
connectDatabase();

const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is working on http://localhost:${process.env.PORT}/`);
});


// unhandeled Promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error : ${err.message}`);
//   console.log("Shutting down the server due to Unhandled Promise Rejection")
//   server.close(() => {
//     process.exit(1);
//   })
// })

