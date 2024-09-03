const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const form = require('./routes/form');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Image upload setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Use form router
app.use('/form', form);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Set up nodemailer transporter using environment variables
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

