const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/click-the-box', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for high scores
const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
});

const Score = mongoose.model('Score', scoreSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to get high scores
app.get('/high-scores', async (req, res) => {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
});

// Endpoint to submit a score
app.post('/submit-score', async (req, res) => {
    const newScore = new Score(req.body);
    await newScore.save();
    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
