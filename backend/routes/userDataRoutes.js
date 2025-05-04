// backend\routes\userDataRoutes.js

const express = require('express');
const { linkUserWithResume, getResumeIdByClerkId } = require('../controllers/userDataController');

const router = express.Router();

router.post('/user/link', linkUserWithResume); // clerkId, resumeId, userName, userEmail
router.get('/user/:clerkId', getResumeIdByClerkId);

module.exports = router;
