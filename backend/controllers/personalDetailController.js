const PersonalDetail = require('../models/PersonalDetail');

// Save or update personal detail based on resumeId
const upsertPersonalDetail = async (req, res) => {
    const { resumeId } = req.params;
    const data = req.body;

    try {
        const updated = await PersonalDetail.findOneAndUpdate(
            { resumeId },
            { ...data, resumeId },
            { upsert: true, new: true, runValidators: true }
        );
        res.status(200).json({ message: 'Personal details saved', data: updated });
    } catch (error) {
        console.error('Error saving personal detail:', error);
        res.status(500).json({ message: 'Failed to save personal details' });
    }
};

// Get personal detail
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
