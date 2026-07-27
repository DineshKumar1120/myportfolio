const mongoose = require('mongoose');

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] Warning: Could not connect to external MongoDB at ${connUri}.`);
    console.warn(`[Database] Running in Fallback Data Mode (In-Memory / Local Storage Simulation).`);
    return false;
  }
};

module.exports = connectDB;
