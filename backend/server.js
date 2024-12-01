const express = require('express');
const mongoose = require('mongoose');
const { Patient, Appointment, User } = require('./db'); // Import User along with Patient and Appointment


const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Health Check
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Endpoints

// Create a new patient
app.post('/patients', async (req, res) => {
    try {
        const { username, password, name, record } = req.body;

        // Create the User account
        const user = new User({ username, password, role: 'patient' });
        const savedUser = await user.save();

        // Find the highest existing Patient ID and increment it
        const lastPatient = await Patient.findOne().sort({ id: -1 });
        const newId = lastPatient && lastPatient.id ? lastPatient.id + 1 : 1;

        // Create the Patient record
        const patient = new Patient({ id: newId, name, record, userId: savedUser._id });
        const savedPatient = await patient.save();

        res.status(201).send({ user: savedUser, patient: savedPatient });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

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
        // Check if patientId exists in the database
        const patient = await Patient.findOne({ id: req.body.patientId });
        if (!patient) return res.status(404).send({ error: 'Patient not found' });

        const appointment = new Appointment(req.body);
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
