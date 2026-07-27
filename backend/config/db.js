const mongoose = require('mongoose');

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 15000,
      family: 4, // Force IPv4 DNS resolution for cloud servers (Render)
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] Warning: Could not connect to external MongoDB at ${connUri}.`);
    console.warn(`[Database] Error detail: ${error.message}`);
    console.warn(`[Database] Running in Fallback Data Mode.`);
    return false;
  }
};

module.exports = connectDB;
