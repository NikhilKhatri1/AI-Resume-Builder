// backend\controllers\personalDetailController.js

const PersonalDetail = require('../models/PersonalDetail');
const sanitizeHtml = require('sanitize-html');

// Save or update personal detail
const upsertPersonalDetail = async (req, res) => {
    const { resumeId } = req.params;
    const data = req.body;

    try {
        // Sanitize HTML fields
        const sanitizedData = { ...data };
        if (sanitizedData.summary) {
            sanitizedData.summary = sanitizeHtml(sanitizedData.summary);
        }
        if (sanitizedData.experience) {
            sanitizedData.experience = sanitizedData.experience.map(exp => ({
                ...exp,
                workSummary: sanitizeHtml(exp.workSummary || '')
            }));
        }

        // Upsert: update if exists, create if not
        const updated = await PersonalDetail.findOneAndUpdate(
            { resumeId },
            { $set: sanitizedData },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ message: 'Personal details saved', data: updated });
    } catch (error) {
        console.error('Error saving personal detail:', error);
        res.status(500).json({ message: 'Failed to save personal details', error: error.message });
    }
};

// Get personal detail by resumeId
const getPersonalDetail = async (req, res) => {
    const { resumeId } = req.params;

    try {
        const detail = await PersonalDetail.findOne({ resumeId });
        if (!detail) {
            return res.status(200).json({}); // Return empty object for new resumes
        }
        res.status(200).json(detail);
    } catch (error) {
        console.error('Error fetching personal detail:', error);
        res.status(500).json({ message: 'Failed to fetch personal details' });
    }
};

module.exports = {
    upsertPersonalDetail,
    getPersonalDetail
};