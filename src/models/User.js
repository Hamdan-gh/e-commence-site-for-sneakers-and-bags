import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Address schema for user addresses
const AddressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['home', 'work', 'other'],
    required: true,
    default: 'home'
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  address1: {
    type: String,
    required: true,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true,
    default: 'United States'
  },
  phone: {
    type: String,
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { _id: true, timestamps: true });

// User schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxLength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters long'],
    select: false // Don't include password in queries by default
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    lowercase: true
  },
  avatar: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'staff'],
    default: 'customer'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  addresses: [AddressSchema],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  lastLoginAt: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.passwordResetToken;
      delete ret.emailVerificationToken;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Indexes
UserSchema?.index({ email: 1 });
UserSchema?.index({ role: 1 });
UserSchema?.index({ status: 1 });
UserSchema?.index({ createdAt: -1 });
UserSchema?.index({ isDeleted: 1 });

// Virtual for full name
UserSchema?.virtual('fullName')?.get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for default address
UserSchema?.virtual('defaultAddress')?.get(function() {
  return this.addresses?.find(address => address?.isDefault) || this.addresses?.[0];
});

// Pre-save middleware for password hashing
UserSchema?.pre('save', async function(next) {
  // Only hash password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    this.password = await bcrypt?.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to ensure only one default address
UserSchema?.pre('save', function(next) {
  if (this.addresses && this.addresses?.length > 0) {
    const defaultAddresses = this.addresses?.filter(addr => addr?.isDefault);
    
    // If no default address is set, make the first one default
    if (defaultAddresses?.length === 0) {
      this.addresses[0].isDefault = true;
    }
    // If multiple default addresses, keep only the last one as default
    else if (defaultAddresses?.length > 1) {
      this.addresses?.forEach((addr, index) => {
        addr.isDefault = (index === this.addresses?.length - 1) && addr?.isDefault;
      });
    }
  }
  next();
});

// Instance method to check password
UserSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt?.compare(candidatePassword, this.password);
};

// Instance method to check if password changed after JWT was issued
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt?.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to add product to wishlist
UserSchema.methods.addToWishlist = function(productId) {
  if (!this.wishlist?.includes(productId)) {
    this.wishlist?.push(productId);
  }
  return this.save();
};

// Instance method to remove product from wishlist
UserSchema.methods.removeFromWishlist = function(productId) {
  this.wishlist = this.wishlist?.filter(id => !id?.equals(productId));
  return this.save();
};

// Instance method to add address
UserSchema.methods.addAddress = function(addressData) {
  // If this is set as default, unset other default addresses
  if (addressData?.isDefault) {
    this.addresses?.forEach(addr => {
      addr.isDefault = false;
    });
  }
  
  this.addresses?.push(addressData);
  return this.save();
};

// Instance method to update address
UserSchema.methods.updateAddress = function(addressId, updateData) {
  const address = this.addresses?.id(addressId);
  if (!address) {
    throw new Error('Address not found');
  }
  
  // If setting as default, unset other default addresses
  if (updateData?.isDefault) {
    this.addresses?.forEach(addr => {
      addr.isDefault = false;
    });
  }
  
  Object.assign(address, updateData);
  return this.save();
};

// Instance method to remove address
UserSchema.methods.removeAddress = function(addressId) {
  this.addresses?.id(addressId)?.remove();
  
  // If removed address was default and there are other addresses, make first one default
  const hasDefault = this.addresses?.some(addr => addr?.isDefault);
  if (!hasDefault && this.addresses?.length > 0) {
    this.addresses[0].isDefault = true;
  }
  
  return this.save();
};

// Static methods
UserSchema.statics.findActiveUsers = function() {
  return this.find({ status: 'active', isDeleted: false });
};

UserSchema.statics.findByRole = function(role) {
  return this.find({ role, isDeleted: false });
};

export default mongoose?.model('User', UserSchema);