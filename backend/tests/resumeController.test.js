const request = require('supertest');
const app = require('../app'); // Assuming app.js is where you have set up express
const mongoose = require('mongoose');
const Resume = require('../models/Resume');

// Mongoose models will be cleared before tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Resume Controller', () => {
    // Test for creating a resume
    it('should create a new resume', async () => {
        const response = await request(app)
            .post('/api/resumes')
            .send({
                data: {
                    title: 'My Resume',
                    resumeId: 'resume-123',
                    userEmail: 'test@example.com',
                    userName: 'John Doe',
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Resume created successfully!');
        expect(response.body.resume).toHaveProperty('title', 'My Resume');
    });

    // Test for fetching resumes for a user
    it('should fetch all resumes for a specific user', async () => {
        const response = await request(app)
            .get('/api/resumes')
            .query({ userEmail: 'test@example.com' });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test for when no resumes are found
    it('should return a 404 if no resumes are found for a user', async () => {
        const response = await request(app)
            .get('/api/resumes')
            .query({ userEmail: 'nonexistent@example.com' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No resumes found');
    });
});
