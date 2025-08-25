require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ===================== MIDDLEWARE =====================
app.use(cors());
app.use(express.json());

// ===================== MONGOOSE MODEL =====================
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ===================== AUTH MIDDLEWARE =====================
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded; // { userId: ... }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// ===================== ROUTES =====================

app.post('/auth/signup', async (req, res) => {
  const { firstname, lastname, mobileNumber, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ firstname, lastname, mobileNumber, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });

    // Send response
    res.status(200).json({ token, user: { id: user._id, firstname, lastname, email, mobileNumber } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



app.post('/auth/login', async (req, res) => {
  const { identifier, password } = req.body; // email or mobileNumber
  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { mobileNumber: identifier }] });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, mobileNumber: user.mobileNumber } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/update/:id', auth, async (req, res) => {
  const updates = { ...req.body };
  try {
    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);

    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all other users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // fetch all from MongoDB
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== DATABASE CONNECTION =====================
mongoose.connect('mongodb://127.0.0.1:27017/mern_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected to mern_auth'))
  .catch(err => console.error('MongoDB connection error:', err));

// ===================== START SERVER =====================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
