// controllers/resumeController.js

const Resume = require('../models/Resume');

// Controller to create a resume
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
        res.status(201).json({ message: 'Resume created successfully!', resume: newResume });
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Error creating resume' });
    }
};

// Controller to get all resumes for a specific user
const getResumes = async (req, res) => {
    const { userEmail } = req.query;

    try {
        const resumes = await Resume.find({ userEmail });

        if (resumes.length === 0) {
            return res.status(404).json({ message: 'No resumes found' });
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