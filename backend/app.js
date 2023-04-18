const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")

app.use(express.json());

//route imports
const product = require("./routers/productRoute");
app.use("/api/v1", product);
app.get('/', function (req, res) {
    res.send("Hello world!");
});

//middleware for error
app.use(errorMiddleware)

module.exports = app;
