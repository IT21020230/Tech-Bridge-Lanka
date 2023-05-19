const mongoose = require("mongoose");

// Define the district schema
const districtSchema = new mongoose.Schema({
  district: { type: String, required: true },
  population: { type: Number, required: true },
  count: { type: Number, default: 0 },
});

// Create the District model
const District = mongoose.model("District", districtSchema);

// One-time code to add districts and populations
// const districts = [
//   { district: "Colombo", population: 2377000 },
//   { district: "Gampaha", population: 2318000 },
//   { district: "Kalutara", population: 1297000 },
//   { district: "Kandy", population: 1262000 },
//   { district: "Matale", population: 500000 },
//   { district: "Nuwara Eliya", population: 900000 },
//   { district: "Galle", population: 1162000 },
//   { district: "Matara", population: 814000 },
//   { district: "Hambantota", population: 595000 },
//   { district: "Jaffna", population: 583000 },
//   { district: "Mannar", population: 100000 },
//   { district: "Vavuniya", population: 174000 },
//   { district: "Mullaitivu", population: 115000 },
//   { district: "Batticaloa", population: 523000 },
//   { district: "Ampara", population: 648000 },
//   { district: "Trincomalee", population: 380000 },
//   { district: "Kurunegala", population: 1632000 },
//   { district: "Puttalam", population: 855000 },
//   { district: "Anuradhapura", population: 855000 },
//   { district: "Polonnaruwa", population: 406000 },
//   { district: "Badulla", population: 837000 },
//   { district: "Monaragala", population: 464000 },
//   { district: "Ratnapura", population: 1014000 },
//   { district: "Kegalle", population: 831000 },
// ];

// District.insertMany(districts)

// Export the District model
module.exports = District;
