const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001; // Use a different port than your Nuxt app

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Endpoint to get tasks from the JSON file
app.get('/api/tasks', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }
        res.json(JSON.parse(data)); // Return tasks
    });
});

// Endpoint to save tasks to the JSON file
app.post('/api/tasks', (req, res) => {
    const tasks = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save tasks' });
        }
        res.json({ message: 'Tasks saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
