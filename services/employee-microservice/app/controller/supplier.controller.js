const Supplier = require("../models/supplier.model.js");
const { body, validationResult } = require("express-validator");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const supplier = new Supplier({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    email: req.body.email,
    phone: req.body.phone
  });

  Supplier.create(supplier, (err, data) => {
    if (err)
      res.render("500", { message: "Error occurred while creating Supplier." });
    else res.redirect("/admin/suppliers");
  });
};

exports.findAll = (req, res) => {
  Supplier.getAll((err, data) => {
    if (err)
      res.render("500", { message: "Problem retrieving list of suppliers" });
    else res.render("supplier-list-all", { suppliers: data });
  });
};

exports.findOne = (req, res) => {
  Supplier.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Supplier with id ${req.params.id}.` });
      } else {
        res.render("500", { message: `Error retrieving Supplier with id ${req.params.id}` });
      }
    } else res.render("supplier-update", { supplier: data });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  Supplier.updateById(
    req.params.id,
    new Supplier(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({ message: `Not found Supplier with id ${req.params.id}.` });
        } else {
          res.render("500", { message: `Error updating Supplier with id ${req.params.id}` });
        }
      } else res.redirect("/admin/suppliers");
    }
  );
};

exports.delete = (req, res) => {
  Supplier.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Supplier with id ${req.params.id}.` });
      } else {
        res.render("500", { message: `Could not delete Supplier with id ${req.params.id}` });
      }
    } else res.redirect("/admin/suppliers");
  });
};
