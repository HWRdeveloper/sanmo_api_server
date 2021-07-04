const Doctor = require("../models/doctors.model.js");

// Create and Save a new Doctor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const doctor = new Doctor({
    'name': req.body.name,
    'hospital': req.body.hospital,
    'department': req.body.department,
    'phone': req.body.phone

  });

  // Save Customer in the database
  Doctor.create(doctor, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Doctors from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Doctor with a customerId
exports.findOne = (req, res) => {
  
};

// Update a Doctor identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Doctor with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Doctors from the database.
exports.deleteAll = (req, res) => {
  
};