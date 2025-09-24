// src/config/db.js
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set in environment');
  }

  // Pooling and connection options
  const opts = {
    // Connection pool
    maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE, 10) || 50, // how many connections in the pool
    minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE, 10) || 5,  // keep a few idle sockets ready
    // Timeouts
    serverSelectionTimeoutMS: parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS, 10) || 5000,
    socketTimeoutMS: parseInt(process.env.MONGO_SOCKET_TIMEOUT_MS, 10) || 45000,
    // parser / topology - safe defaults
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  };

  // Optional: disable automatic index builds in production for better performance
  if (process.env.NODE_ENV === 'production') {
    mongoose.set('autoIndex', false);
  }

  // Avoid strictQuery warnings depending on Mongoose version
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(uri, opts);
    console.log('MongoDB connected:', {
      host: mongoose.connection.host,
      readyState: mongoose.connection.readyState,
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    // Optional: log re-connects
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // If initial connect fails, exit process so orchestration can restart it
    process.exit(1);
  }
}

module.exports = connectDB;
