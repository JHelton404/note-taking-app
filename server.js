const express = require('express');
const routes = require('./router.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static('public'));

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});