const mongoose = require('mongoose');

const connectDB = async () => {
  let connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 12000,
      family: 4,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    // If SRV DNS lookup fails, attempt automatic conversion to standard 3-node shard URI
    if (connUri.includes('mongodb+srv://') && connUri.includes('cluster0.wheihrr.mongodb.net')) {
      console.log('[Database] Retrying with direct shard node connection format...');
      const fallbackUri = connUri
        .replace('mongodb+srv://', 'mongodb://')
        .replace(
          'cluster0.wheihrr.mongodb.net',
          'cluster0-shard-00-00.wheihrr.mongodb.net:27017,cluster0-shard-00-01.wheihrr.mongodb.net:27017,cluster0-shard-00-02.wheihrr.mongodb.net:27017'
        ) + (connUri.includes('?') ? '&ssl=true&authSource=admin' : '?ssl=true&authSource=admin');

      try {
        const conn2 = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 12000,
          family: 4,
        });
        console.log(`[Database] MongoDB Connected via Direct Shards: ${conn2.connection.host}`);
        return true;
      } catch (err2) {
        console.warn(`[Database] Shard retry failed: ${err2.message}`);
      }
    }

    console.warn(`[Database] Warning: Could not connect to external MongoDB at ${connUri}.`);
    console.warn(`[Database] Error detail: ${error.message}`);
    console.warn(`[Database] Running in Fallback Data Mode.`);
    return false;
  }
};

module.exports = connectDB;
