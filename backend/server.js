const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Patient, Appointment, User } = require('./db'); // Import User, Patient, and Appointment models

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Health Check
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Endpoints

// Create a new patient with EMR file upload
app.post('/patients', upload.single('file'), async (req, res) => {
  try {
    const { username, password, name, age, gender, email } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send({ error: 'EMR file is required' });
    }

    // Create the User account
    const user = new User({ username, password, role: 'patient' });
    const savedUser = await user.save();

    // Find the highest existing Patient ID and increment it
    const lastPatient = await Patient.findOne().sort({ id: -1 });
    const newId = lastPatient && lastPatient.id ? lastPatient.id + 1 : 1;

    // Create the Patient record
    const patient = new Patient({
      id: newId,
      name,
      age,
      gender,
      email,
      file: req.file.path, // Save file path
      userId: savedUser._id,
    });
    const savedPatient = await patient.save();

    res.status(201).send({ user: savedUser, patient: savedPatient });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate the role
    if (!['patient', 'physician'].includes(role)) {
      return res.status(400).send({ error: 'Invalid role. Must be "patient" or "physician".' });
    }

    // Create the User
    const user = new User({ username, password, role });
    const savedUser = await user.save();

    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId');
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a single patient by ID
app.get('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send({ error: 'Patient not found' });
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get a patient’s user details
app.get('/patients/:id/user', async (req, res) => {
  try {
    const patient = await Patient.findOne({ id: req.params.id }).populate('userId');
    if (!patient) return res.status(404).send({ error: 'Patient not found' });
    res.status(200).send(patient.userId);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create an appointment for a patient
app.post('/appointments', async (req, res) => {
  try {
    const { patientId, date, reason } = req.body;

    // Check if patientId exists in the database
    const patient = await Patient.findOne({ id: patientId });
    if (!patient) return res.status(404).send({ error: 'Patient not found' });

    const appointment = new Appointment({ patientId: patient._id, date, reason });
    const savedAppointment = await appointment.save();
    res.status(201).send(savedAppointment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get appointments for a specific patient
app.get('/appointments/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId }).populate('patientId');
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a patient by ID
app.delete('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).send({ error: 'Patient not found' });
    res.status(200).send({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete an appointment by ID
app.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).send({ error: 'Appointment not found' });
    res.status(200).send({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username and password
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).send({ error: 'Invalid username or password' });

    // Redirect based on role
    if (user.role === 'patient') {
      res.status(200).send({ message: 'Redirecting to patient page...', redirectTo: '/patient' });
    } else if (user.role === 'physician') {
      res.status(200).send({ message: 'Redirecting to physician page...', redirectTo: '/physician' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
