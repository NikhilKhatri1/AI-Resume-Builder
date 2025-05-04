// backend\routes\resumeRoutes.js

const express = require('express');
const { createResume, getResumes } = require('../controllers/resumeController');


const router = express.Router();

// Route to create a resume
router.post('/api/resumes', createResume);

// Route to get all resumes for a specific user
router.get('/api/resumes', getResumes);

module.exports = router;
