
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load env variables at the top

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schema Fix
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  code: String,
  phone: String,
  address: String,
  income: String,
  creditScore: Number,
  reason: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// API route
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact form saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving contact form' });
  }
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
