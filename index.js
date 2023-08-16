
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/trains', async (req, res) => {
    const act = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTU4NzEsImNvbXBhbnlOYW1lIjoiVGVzdCBDb21wYW55IiwiY2xpZW50SUQiOiIwZGJlYTQ0ZC1lZjM0LTRlNTgtOTljMS1jYjc2NjE3MWQ3NmEiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiOTY5NiJ9.-WtJjPJbdaFsYPJ0cGEKAaS59dFdGZbE95sV25s_yys";

    try {
        const response = await axios.get('http://20.244.56.144/train/trains', {
            headers: {
                Authorization: `Bearer ${act}`
            }
        });

        const trains = response.data; 
        res.status(200).json(trains); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching trains.' });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
