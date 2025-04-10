// tests/resumeController.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Resume = require('../models/Resume');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Resume Controller', () => {
    // Clear resumes before each test
    beforeEach(async () => {
        await Resume.deleteMany({});
    });

    it('should create a new resume', async () => {
        const uniqueResumeId = `resume-${Date.now()}`;

        const response = await request(app)
            .post('/api/resumes')
            .send({
                data: {
                    title: 'My Resume',
                    resumeId: uniqueResumeId,
                    userEmail: 'test@example.com',
                    userName: 'John Doe',
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Resume created successfully!');
        expect(response.body.resume).toHaveProperty('title', 'My Resume');
    });

    it('should fetch all resumes for a specific user', async () => {
        const resume = new Resume({
            title: 'Test Resume',
            resumeId: `resume-${Date.now()}`,
            userEmail: 'test@example.com',
            userName: 'Jane Doe',
        });
        await resume.save();

        const response = await request(app)
            .get('/api/resumes')
            .query({ userEmail: 'test@example.com' });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return a 404 if no resumes are found for a user', async () => {
        const response = await request(app)
            .get('/api/resumes')
            .query({ userEmail: 'nonexistent@example.com' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No resumes found');
    });
});
