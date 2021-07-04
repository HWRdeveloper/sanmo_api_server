const sql = require("./db.js");

// constructor
const Doctor = function(doctor) {
  this.name = doctor.name;
  this.hospital = doctor.hospital;
  this.department = doctor.department;
  this.phone = doctor.phone;
};


Doctor.create = (newDoctor, result) => {
  sql.query("INSERT INTO doctors SET ?", newDoctor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created doctor: ", { id: res.insertId, ...newDoctor });
    result(null, { id: res.insertId, ...newDoctor });
  });
};

Doctor.findById = (doctorId, result) => {
  sql.query(`SELECT * FROM doctors WHERE id = ${doctorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found doctor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Doctor with the id
    result({ kind: "not_found" }, null);
  });
};

Doctor.getAll = result => {
  sql.query("SELECT * FROM doctors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctors: ", res);
    result(null, res);
  });
};

Doctor.updateById = (id, doctor, result) => {
  sql.query(
    "UPDATE doctors SET hospital = ?, name = ?, phone = ?, department = ? WHERE id = ?",
    [doctor.hospital, doctor.name, doctor.phone, doctor.department, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Doctor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated doctor: ", { id: id, ...doctor });
      result(null, { id: id, ...doctor });
    }
  );
};

Doctor.remove = (id, result) => {
  sql.query("DELETE FROM doctors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Doctor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted doctor with id: ", id);
    result(null, res);
  });
};

Doctor.removeAll = result => {
  sql.query("DELETE FROM doctors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} doctors`);
    result(null, res);
  });
};

module.exports = Doctor;