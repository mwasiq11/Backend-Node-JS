const express = require("express");
const app = express();
// middleware to connect app with server
// Global middleware (runs for every request)
app.use((req, res, next) => {
  console.log("Global middleware:", req.url, req.method);
  next();
});

// Home route
app.get("/", (req, res) => {
  console.log("Home route hit:", req.url, req.method);
  res.send("<h1>Express JS</h1>");
});

// Submit-details route
app.get("/submit-details", (req, res) => {
  console.log("Submit-details route hit:", req.url, req.method);
  res.send("<p>Learning Express JS</p>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
