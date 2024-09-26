const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
    const { url } = req.body;
    console.log(process.env.AYLIEN_APP_ID);
    try {
        const response = await axios.get(`https://api.aylien.com/api/v1/extract`, {
            params: { url },
            headers: {
                'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_APP_ID,
                'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_APP_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Your credentials is incorrect', reason: 'I can not sign up on aylien with personal email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
