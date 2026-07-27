const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const seedDefaultData = require('./utils/seed');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5001;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API Server is running smoothly.', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`[Server] Technical Trainer Portfolio Backend listening on port ${port}`);
    console.log(`[Server] API Health Check: http://localhost:${port}/health`);
    console.log(`[Server] Public API Bundle: http://localhost:${port}/api/public/all`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[Server] Port ${port} is occupied, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('[Server] Unexpected error:', err);
    }
  });
}

// Initialize DB and launch server
connectDB().then(async (isConnected) => {
  if (isConnected) {
    await seedDefaultData();
  } else {
    console.warn('[Server] Skipping automatic data seeder because database is not connected.');
  }
  startServer(PORT);
});
