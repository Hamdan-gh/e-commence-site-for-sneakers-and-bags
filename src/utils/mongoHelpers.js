import mongoose from 'mongoose';

// MongoDB connection status helpers
export const getConnectionState = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states?.[mongoose?.connection?.readyState],
    readyState: mongoose?.connection?.readyState,
    host: mongoose?.connection?.host,
    port: mongoose?.connection?.port,
    name: mongoose?.connection?.name
  };
};

// ObjectId validation and utilities
export const isValidObjectId = (id) => {
  return mongoose?.Types?.ObjectId?.isValid(id);
};

export const createObjectId = (id = null) => {
  return id ? new mongoose.Types.ObjectId(id) : new mongoose.Types.ObjectId();
};

export const objectIdToString = (objectId) => {
  return objectId ? objectId?.toString() : null;
};

// Query helpers
export const buildSearchQuery = (searchTerm, fields = []) => {
  if (!searchTerm || fields?.length === 0) return {};
  
  const searchRegex = new RegExp(searchTerm, 'i');
  const orConditions = fields?.map(field => ({
    [field]: { $regex: searchRegex }
  }));
  
  return { $or: orConditions };
};

export const buildDateRangeQuery = (startDate, endDate, field = 'createdAt') => {
  const query = {};
  
  if (startDate || endDate) {
    query[field] = {};
    if (startDate) query[field].$gte = new Date(startDate);
    if (endDate) query[field].$lte = new Date(endDate);
  }
  
  return query;
};

export const buildPaginationQuery = (page = 1, limit = 10) => {
  const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
  return { skip, limit: Math.max(1, limit) };
};

// Aggregation helpers
export const buildSortStage = (sortBy = 'createdAt', sortOrder = 'desc') => {
  const order = sortOrder?.toLowerCase() === 'asc' ? 1 : -1;
  return { $sort: { [sortBy]: order } };
};

export const buildMatchStage = (conditions = {}) => {
  if (Object.keys(conditions)?.length === 0) return null;
  return { $match: conditions };
};

export const buildLookupStage = (from, localField, foreignField, as) => {
  return {
    $lookup: {
      from,
      localField,
      foreignField,
      as
    }
  };
};

// Data validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex?.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex?.test(phone);
};

export const sanitizeStringInput = (input, maxLength = 1000) => {
  if (typeof input !== 'string') return '';
  
  return input?.trim()?.slice(0, maxLength)?.replace(/[<>]/g, ''); // Basic XSS prevention
};

export const sanitizeNumberInput = (input, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = parseFloat(input);
  if (isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
};

// Error handling helpers
export const handleMongoError = (error) => {
  console.error('MongoDB Error:', error);
  
  // Duplicate key error
  if (error?.code === 11000) {
    const field = Object.keys(error?.keyPattern)?.[0] || 'field';
    return {
      type: 'validation',
      message: `${field} already exists`,
      field
    };
  }
  
  // Validation error
  if (error?.name === 'ValidationError') {
    const errors = Object.values(error?.errors)?.map(err => ({
      field: err?.path,
      message: err?.message,
      value: err?.value
    }));
    
    return {
      type: 'validation',
      message: 'Validation failed',
      errors
    };
  }
  
  // Cast error (invalid ObjectId, etc.)
  if (error?.name === 'CastError') {
    return {
      type: 'validation',
      message: `Invalid ${error?.path}: ${error?.value}`,
      field: error?.path
    };
  }
  
  // Generic MongoDB error
  return {
    type: 'database',
    message: error?.message || 'Database operation failed',
    code: error?.code
  };
};

// Performance helpers
export const addIndexes = async (model, indexes = []) => {
  try {
    for (const index of indexes) {
      await model?.collection?.createIndex(index?.fields, index?.options || {});
      console.log(`✅ Created index for ${model?.modelName}:`, index?.fields);
    }
  } catch (error) {
    console.error(`❌ Error creating indexes for ${model?.modelName}:`, error);
  }
};

export const dropIndexes = async (model, indexNames = []) => {
  try {
    for (const indexName of indexNames) {
      await model?.collection?.dropIndex(indexName);
      console.log(`✅ Dropped index ${indexName} for ${model?.modelName}`);
    }
  } catch (error) {
    console.error(`❌ Error dropping indexes for ${model?.modelName}:`, error);
  }
};

// Data seeding helpers
export const seedCollection = async (model, data, options = {}) => {
  try {
    const { clearExisting = false, upsert = false } = options;
    
    if (clearExisting) {
      await model?.deleteMany({});
      console.log(`✅ Cleared existing data in ${model?.modelName}`);
    }
    
    if (upsert) {
      const operations = data?.map(item => ({
        updateOne: {
          filter: { _id: item?._id || createObjectId() },
          update: { $set: item },
          upsert: true
        }
      }));
      
      const result = await model?.bulkWrite(operations);
      console.log(`✅ Seeded ${result?.upsertedCount + result?.modifiedCount} documents in ${model?.modelName}`);
      return result;
    } else {
      const result = await model?.insertMany(data, { ordered: false });
      console.log(`✅ Seeded ${result?.length} documents in ${model?.modelName}`);
      return result;
    }
  } catch (error) {
    console.error(`❌ Error seeding ${model?.modelName}:`, error);
    throw error;
  }
};

// Connection monitoring
export const monitorConnection = () => {
  mongoose?.connection?.on('connected', () => {
    console.log('🔗 MongoDB connected successfully');
  });
  
  mongoose?.connection?.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });
  
  mongoose?.connection?.on('disconnected', () => {
    console.log('🔌 MongoDB disconnected');
  });
  
  mongoose?.connection?.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });
  
  // Log connection state changes
  let lastState = mongoose?.connection?.readyState;
  setInterval(() => {
    const currentState = mongoose?.connection?.readyState;
    if (currentState !== lastState) {
      console.log('🔄 MongoDB connection state changed:', getConnectionState());
      lastState = currentState;
    }
  }, 10000); // Check every 10 seconds
};

export default {
  getConnectionState,
  isValidObjectId,
  createObjectId,
  objectIdToString,
  buildSearchQuery,
  buildDateRangeQuery,
  buildPaginationQuery,
  buildSortStage,
  buildMatchStage,
  buildLookupStage,
  validateEmail,
  validatePhone,
  sanitizeStringInput,
  sanitizeNumberInput,
  handleMongoError,
  addIndexes,
  dropIndexes,
  seedCollection,
  monitorConnection
};