const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'join' or 'register'
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String },
  area: { type: String },
  level: { type: String },
  sports: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);