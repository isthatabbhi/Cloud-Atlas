const sql = require("./db.js");

const Supplier = function(supplier) {
  this.name = supplier.name;
  this.address = supplier.address;
  this.city = supplier.city;
  this.state = supplier.state;
  this.email = supplier.email;
  this.phone = supplier.phone;
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

module.exports = Supplier;
