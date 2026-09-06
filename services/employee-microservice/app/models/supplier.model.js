const sql = require("./db.js");

const Supplier = function(supplier) {
  this.name = supplier.name;
  this.address = supplier.address;
  this.city = supplier.city;
  this.state = supplier.state;
  this.email = supplier.email;
  this.phone = supplier.phone;
};

Supplier.create = (newSupplier, result) => {
  sql.query("INSERT INTO suppliers SET ?", newSupplier, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newSupplier });
  });
};

Supplier.findById = (supplierId, result) => {
  sql.query(`SELECT * FROM suppliers WHERE id = ${supplierId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Supplier.getAll = result => {
  sql.query("SELECT * FROM suppliers", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Supplier.updateById = (id, supplier, result) => {
  sql.query(
    "UPDATE suppliers SET name = ?, address = ?, city = ?, state = ?, email = ?, phone = ? WHERE id = ?",
    [supplier.name, supplier.address, supplier.city, supplier.state, supplier.email, supplier.phone, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...supplier });
    }
  );
};

Supplier.remove = (id, result) => {
  sql.query("DELETE FROM suppliers WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Supplier;
