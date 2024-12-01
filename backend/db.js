const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://amaree:WLCMbKlOYcuSNfvl@continuum.c73w2.mongodb.net/?retryWrites=true&w=majority&appName=continuum';

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB...hellooo'))
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
    });

// Patient Schema
const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String },
    file: { type: String, required: true }, // Path to the uploaded EMR file
    uploadedAt: { type: Date, default: Date.now },
  });

// Appointment Schema
const appointmentSchema = mongoose.Schema({
    patientId: { type: Number, ref: 'Patient', required: true }, // Numeric ID
    date: { type: Date, required: true },
    reason: { type: String, required: true, trim: true },
}, { timestamps: true });

// User Schema
const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true }, // No hashing for simplicity
    role: { type: String, required: true, enum: ['patient', 'physician'] } // 'patient' or 'physician'
}, { timestamps: true });

// Models
const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Patient, Appointment, User };
