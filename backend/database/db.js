// /database/db.js

const mongoose = require("mongoose");

const connectDb = async (req, res) => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (!response) throw new Error("Failed to connect to the database");
        console.log("Connected to DB");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;