const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");


mongoose.connect("mongodb+srv://abesh:abesh@cluster0-duuve.mongodb.net/abeshtest?retryWrites=true&w=majority",
      { useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
          console.log('mongodb connected')
      });

//Models
require("./model/Post");
require("./model/Comment");


app.use(bodyParser.json()).use(morgan());

//Routes
app.use("/posts", require("./routes/posts"));

//Not Found Route
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

//error handler

if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack
  });
});

app.listen(8888, function() {
  console.log("Server is running on port 8888");
});