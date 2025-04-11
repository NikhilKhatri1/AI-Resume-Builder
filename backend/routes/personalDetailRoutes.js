const express = require('express');
const { upsertPersonalDetail, getPersonalDetail } = require('../controllers/personalDetailController');
const router = express.Router();

// PUT: Save or update
router.put('/user-resume/:resumeId', upsertPersonalDetail);

// GET: Fetch
router.get('/user-resume/:resumeId', getPersonalDetail);

module.exports = router;
