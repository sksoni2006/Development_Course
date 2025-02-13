const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const EventEmitter = require('events');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const courseRoutes = require('./routes/courseRoutes'); // Add course structure route

EventEmitter.defaultMaxListeners = 20;
process.setMaxListeners(20);

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'http://localhost:3000'] // Local development URL];


const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

// CORS middleware
app.use(cors(corsOptions));

// Use Route Handlers
app.use('/api/user', userRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/coursestructure', courseRoutes); // Added course structure route

// Root Route
app.get('/', (req, res) => {
    res.send("Hello from Technothlon Server 🚀");
});

// Server Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
