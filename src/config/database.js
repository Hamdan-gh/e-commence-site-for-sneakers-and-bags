import mongoose from 'mongoose';

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
  }

  async connect(mongoUrl = null) {
    if (this.isConnected) {
      console.log('✅ Already connected to MongoDB');
      return mongoose?.connection;
    }

    try {
      // Use provided URL or environment variable
      const dbUrl = mongoUrl || process.env?.VITE_MONGODB_URL || 'mongodb://localhost:27017/sneaksnbags';
      
      const options = {
        // Connection options for production-ready setup
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        retryWrites: true,
        w: 'majority'
      };

      const connection = await mongoose?.connect(dbUrl, options);
      
      this.isConnected = true;
      console.log('✅ Connected to MongoDB successfully');
      console.log(`📍 Database: ${connection?.connection?.db?.databaseName}`);
      
      return connection;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }
  }

  async disconnect() {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose?.disconnect();
      this.isConnected = false;
      console.log('✅ Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose?.connection?.readyState,
      host: mongoose?.connection?.host,
      port: mongoose?.connection?.port,
      name: mongoose?.connection?.name
    };
  }
}

// Create singleton instance
const dbConnection = new DatabaseConnection();

// Handle connection events
mongoose?.connection?.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose?.connection?.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose?.connection?.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await dbConnection?.disconnect();
  process.exit(0);
});

export default dbConnection;