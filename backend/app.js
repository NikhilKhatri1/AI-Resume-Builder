// app.js
const express = require("express");
const cors = require("cors");
const connectDb = require("./database/db");
const resumeRoutes = require("./routes/resumeRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDb();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Or your front-end URL
}));

// Basic route for homepage
app.get("/", (req, res) => {
    res.send("homepage");
});

// Resume routes
app.use(resumeRoutes);

// Export the app for use in tests
module.exports = app;

// Start the server (if this file is run directly)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}


