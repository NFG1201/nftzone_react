const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connect
mongoose.connect('mongodb://localhost:27017/nftzone_react', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SurveySchema = new mongoose.Schema({
  username: String,
  phone: String,
  email: String,
  password: String,
  inviteCode: String,
});

const Survey = mongoose.model('Survey', SurveySchema);

// Admin credentials (hardcoded)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

// Submit account create form
app.post('/api/create-account', async (req, res) => {
  const { username, phone, email, password, inviteCode } = req.body;
  const newSurvey = new Survey({ username, phone, email, password, inviteCode });
  await newSurvey.save();
  res.json({ message: 'Account created successfully' });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Simple token simulation (not secure)
    res.json({ token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware for simple token auth
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if(token === "Bearer fake-jwt-token") {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Get all accounts (admin protected)
app.get('/api/admin/accounts', authMiddleware, async (req, res) => {
  const accounts = await Survey.find();
  res.json(accounts);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});