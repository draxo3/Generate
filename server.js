// server.js
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/keydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Key Schema
const keySchema = new mongoose.Schema({
  key: String,
  createdAt: { type: Date, default: Date.now }
});
const Key = mongoose.model('Key', keySchema);

// Generate Key Endpoint
app.post('/generate', async (req, res) => {
  const key = crypto.randomBytes(16).toString('hex');
  await Key.create({ key });
  res.json({ key });
});

// Validate Key Endpoint
app.post('/validate', async (req, res) => {
  const { key } = req.body;
  const record = await Key.findOne({ key });
  if (record && (Date.now() - record.createdAt.getTime()) < 24 * 60 * 60 * 1000) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// Cleanup expired keys every hour
setInterval(async () => {
  const expiry = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await Key.deleteMany({ createdAt: { $lt: expiry } });
}, 60 * 60 * 1000);

app.listen(3000, () => console.log('Server running on port 3000'));
