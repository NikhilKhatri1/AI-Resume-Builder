const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true }, // Clerk ID
    resumeId: { type: String, required: true },               // Links to resume
}, { timestamps: true });

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
// This schema is used to store user data, including the Clerk ID and the associated resume ID.
// The Clerk ID is unique for each user, and the resume ID links to the user's resume.