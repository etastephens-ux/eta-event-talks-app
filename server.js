const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch talks
app.get('/api/talks', (req, res) => {
  const talksPath = path.join(__dirname, 'talks.json');
  fs.readFile(talksPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading talks.json:', err);
      return res.status(500).json({ error: 'Failed to load talks data.' });
    }
    try {
      const talks = JSON.parse(data);
      res.json(talks);
    } catch (parseError) {
      console.error('Error parsing talks.json:', parseError);
      res.status(500).json({ error: 'Invalid talks data format.' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
