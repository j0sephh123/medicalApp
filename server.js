const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const drugsRoutes = require("./routes/drugs");
const groupsRoutes = require("./routes/groups");

mongoose
  .connect("mongodb://localhost/drugsapp")
  .then(result => console.log('mongodb connected'))
  .catch(err => console.log('mongodb error'));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res
      .status(200)
      .json({});
  }
  next();
}); // headers

app.use("/drugs", drugsRoutes);
app.use("/groups", groupsRoutes);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
}); // errors

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
}); // errors

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);