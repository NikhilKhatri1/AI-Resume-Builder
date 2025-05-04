// backend\app.js
const express = require('express');
const cors = require('cors');
const connectDb = require('./database/db');
const resumeRoutes = require('./routes/resumeRoutes');
const personalDetailRoutes = require('./routes/personalDetailRoutes');
const userDataRoutes = require('./routes/userDataRoutes');
require('dotenv').config();

const app = express();

// Connect to the database
connectDb();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

// Routes
app.get('/', (req, res) => {
    res.send('homepage');
});
app.use('/', resumeRoutes); // /api/resumes
app.use('/', personalDetailRoutes); // /user-resume/:resumeId
app.use('/api', userDataRoutes); // /api/user/link, /api/user/:clerkId

module.exports = app;