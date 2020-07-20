const express = require("express");
const bp = require("body-parser");
const log = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const port = 8000 || process.env.PORT;

app.use(log("common"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
    }
  }
);

app.use("/api", require("./routes/api"));

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.status(404).json({
    message: req.method + " " + req.url + " not found",
    error: "NoEndpointExist",
    code: 404,
  });
  next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
