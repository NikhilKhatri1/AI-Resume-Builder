const mongoose = require('mongoose');

const personalDetailSchema = new mongoose.Schema({
    resumeId: { type: String, required: true }, // Link to the resume
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: true });

const PersonalDetail = mongoose.model('PersonalDetail', personalDetailSchema);

module.exports = PersonalDetail;
