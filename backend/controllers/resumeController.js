// backend\controllers\resumeController.js
const Resume = require('../models/Resume');
const PersonalDetail = require('../models/PersonalDetail');

const createResume = async (req, res) => {
    const { title, resumeId, userEmail, userName } = req.body.data;

    try {
        const newResume = new Resume({
            title,
            resumeId,
            userEmail,
            userName,
        });

        await newResume.save();

        // Initialize PersonalDetail for the resume
        await PersonalDetail.findOneAndUpdate(
            { resumeId },
            { resumeId, userEmail },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: 'Resume created successfully!', resume: newResume });
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Error creating resume', error: error.message });
    }
};

const getResumes = async (req, res) => {
    const { userEmail } = req.query;

    try {
        const resumes = await Resume.find({ userEmail });
        if (resumes.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ message: 'Error fetching resumes' });
    }
};

module.exports = {
    createResume,
    getResumes,
};