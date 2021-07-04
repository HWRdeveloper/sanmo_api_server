module.exports = app => {
    const doctors = require("../controllers/doctor.controller.js");
  
    // Create a new Customer
    app.post("/doctors", doctors.create);
  
    // Retrieve all Customers
    app.get("/doctors", doctors.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/doctors/:customerId", doctors.findOne);
  
    // Update a Customer with customerId
    app.put("/doctors/:customerId", doctors.update);
  
    // Delete a Customer with customerId
    app.delete("/doctors/:customerId", doctors.delete);
  
    // Create a new Customer
    app.delete("/doctors", doctors.deleteAll);
  };