// controllers/personalDetailController.js

const PersonalDetail = require('../models/PersonalDetail');

// Save or update personal detail or summary based on resumeId
const upsertPersonalDetail = async (req, res) => {
    const { resumeId } = req.params;
    const data = req.body;

    try {
        // Check if a document exists already
        const existing = await PersonalDetail.findOne({ resumeId });

        // If it exists, merge or patch only the new data (like summary)
        let updated;
        if (existing) {
            updated = await PersonalDetail.findOneAndUpdate(
                { resumeId },
                { $set: data },
                { new: true, runValidators: true }
            );
        } else {
            // If not exists, make sure required fields exist in first-time creation
            const requiredFields = ['firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email'];
            const missingFields = requiredFields.filter(field => !data[field]);

            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: `Missing required fields for new resume: ${missingFields.join(', ')}`
                });
            }

            updated = await PersonalDetail.create({ ...data, resumeId });
        }

        res.status(200).json({ message: 'Personal details saved', data: updated });
    } catch (error) {
        console.error('Error saving personal detail:', error);
        res.status(500).json({ message: 'Failed to save personal details' });
    }
};

// Get personal detail by resumeId
const getPersonalDetail = async (req, res) => {
    const { resumeId } = req.params;

    try {
        const detail = await PersonalDetail.findOne({ resumeId });
        if (!detail) {
            return res.status(404).json({ message: 'No personal details found' });
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
