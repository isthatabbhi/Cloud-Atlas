const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const supplier = require("./app/controller/supplier.controller.js");
const app = express();
const mustacheExpress = require("mustache-express");
const favicon = require("serve-favicon");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/img/favicon.ico"));

app.get("/", (req, res) => {
  res.render("home", {});
});

app.get("/suppliers/", supplier.findAll);

// Error handlers
app.use(function(req, res, next) {
  res.status(404).render("404", {});
});

const app_port = process.env.APP_PORT || 8080;
app.listen(app_port, () => {
  console.log(`Server is running on port ${app_port}.`);
});
