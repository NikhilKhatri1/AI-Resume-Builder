const UserData = require('../models/UserData');
const Resume = require('../models/Resume');

const linkUserWithResume = async (req, res) => {
    const { clerkId, resumeId, userName, userEmail } = req.body;

    try {
        // Save UserData if not exists
        const existingUser = await UserData.findOne({ clerkId });

        if (!existingUser) {
            await UserData.create({ clerkId, resumeId });
        } else {
            // Update resumeId if changed
            existingUser.resumeId = resumeId;
            await existingUser.save();
        }

        // Create corresponding Resume if not exists
        const existingResume = await Resume.findOne({ resumeId });
        if (!existingResume) {
            await Resume.create({ resumeId, userName, userEmail, title: "Untitled Resume" });
        }

        res.status(200).json({ message: 'User linked with resume successfully' });
    } catch (err) {
        console.error('Error linking user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getResumeIdByClerkId = async (req, res) => {
    const { clerkId } = req.params;

    try {
        const userData = await UserData.findOne({ clerkId });
        if (!userData) {
            return res.status(404).json({ message: 'User data not found' });
        }

        res.status(200).json({ resumeId: userData.resumeId });
    } catch (err) {
        console.error('Error fetching resumeId:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    linkUserWithResume,
    getResumeIdByClerkId
};

