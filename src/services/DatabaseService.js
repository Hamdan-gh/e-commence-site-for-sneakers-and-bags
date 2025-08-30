import dbConnection from '../config/database.js';

class DatabaseService {
  constructor() {
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) {
      console.log('✅ Database service already initialized');
      return;
    }

    try {
      await dbConnection?.connect();
      this.isInitialized = true;
      console.log('✅ Database service initialized successfully');
      
      // Set up error handling
      this.setupErrorHandlers();
      
    } catch (error) {
      console.error('❌ Failed to initialize database service:', error);
      throw error;
    }
  }

  setupErrorHandlers() {
    // Handle MongoDB connection errors
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      
      // Close server gracefully
      this.gracefulShutdown();
    });

    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      
      // Close server gracefully
      this.gracefulShutdown();
    });
  }

  async gracefulShutdown() {
    console.log('🔄 Initiating graceful shutdown...');
    
    try {
      await dbConnection?.disconnect();
      console.log('✅ Database connection closed');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during graceful shutdown:', error);
      process.exit(1);
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      connection: dbConnection?.getConnectionStatus()
    };
  }

  async healthCheck() {
    try {
      const status = dbConnection?.getConnectionStatus();
      
      if (!status?.isConnected) {
        throw new Error('Database not connected');
      }

      return {
        status: 'healthy',
        database: status,
        timestamp: new Date()?.toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error?.message,
        timestamp: new Date()?.toISOString()
      };
    }
  }

  // Utility methods for common database operations
  async executeWithRetry(operation, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Database operation failed (attempt ${attempt}/${maxRetries}):`, error?.message);
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          const delay = Math.pow(2, attempt) * 1000;
          await this.sleep(delay);
        }
      }
    }
    
    throw lastError;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Transaction helper
  async executeTransaction(operations) {
    const session = await dbConnection?.mongoose?.startSession();
    
    try {
      session?.startTransaction();
      
      const results = [];
      for (const operation of operations) {
        const result = await operation(session);
        results?.push(result);
      }
      
      await session?.commitTransaction();
      return results;
    } catch (error) {
      await session?.abortTransaction();
      throw error;
    } finally {
      session?.endSession();
    }
  }

  // Aggregation helper with error handling
  async aggregate(model, pipeline, options = {}) {
    return this.executeWithRetry(async () => {
      return await model?.aggregate(pipeline, options);
    });
  }

  // Bulk operations helper
  async bulkWrite(model, operations, options = {}) {
    return this.executeWithRetry(async () => {
      return await model?.bulkWrite(operations, {
        ordered: false,
        ...options
      });
    });
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

export default databaseService;