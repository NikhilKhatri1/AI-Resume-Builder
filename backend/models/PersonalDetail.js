// backend\models\PersonalDetail.js
const mongoose = require('mongoose');

const personalDetailSchema = new mongoose.Schema({
    resumeId: { type: String, required: true, unique: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    summary: { type: String, default: '' },
    themeColor: { type: String, default: '#ff6666' },
    experience: [{
        title: { type: String, default: '' },
        companyName: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        currentlyWorking: { type: Boolean, default: false },
        workSummary: { type: String, default: '' }
    }],
    education: [{
        universityName: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        degree: { type: String, default: '' },
        major: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    skills: [{
        name: { type: String, default: '' },
        rating: { type: Number, default: 0 }
    }]
}, { timestamps: true });

const PersonalDetail = mongoose.model('PersonalDetail', personalDetailSchema);

module.exports = PersonalDetail;
