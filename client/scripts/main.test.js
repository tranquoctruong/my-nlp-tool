// src/index.test.js
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const app = require('../../server/server'); // Adjust as necessary to import your server

const mock = new MockAdapter(axios);

describe('NLP Tool Tests', () => {
    beforeAll(() => {
        // Setup any required configurations here
    });

    afterEach(() => {
        mock.reset(); // Reset mock after each test
    });

    test('should analyze article successfully', async () => {
        const mockResponse = {
            title: "Test Article",
            sentiment: {
                polarity: "positive",
                subjectivity: "subjective"
            }
        };

        // Mocking the Aylien API response
        mock.onGet(/api\.aylien\.com/).reply(200, mockResponse);

        const response = await axios.post('http://localhost:3000/api/analyze', {
            url: 'https://api.aylien.com/api/v1/extract'
        });

        expect(response.status).toBe(200);
        expect(response.data.title).toBe("Test Article");
        expect(response.data.sentiment.polarity).toBe("positive");
    });

    test('should handle API error', async () => {
        mock.onGet(/api\.aylien\.com/).reply(500);

        const response = await axios.post('http://localhost:3000/api/analyze', {
            url: 'https://api.aylien.com/api/v1/extract'
        });

        expect(response.status).toBe(500);
    });
});
