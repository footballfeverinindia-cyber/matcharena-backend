require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Registration = require('./modelsRegistration');

const app = express();

// Allow your Vercel frontend to talk to this backend
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json()); // Allows backend to read JSON data from frontend

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---

// 1. Handle "Join Community" and "Register" forms
app.post('/api/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ success: true, message: 'Registration saved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// 2. (Optional) Handle Cart Checkouts / Orders
app.post('/api/orders', async (req, res) => {
  try {
    // You can create an Order.js model later, for now we just log it
    console.log('🛒 New Order Received:', req.body);
    res.status(201).json({ success: true, message: 'Order logged!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
