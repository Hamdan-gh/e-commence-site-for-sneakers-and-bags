import mongoose from 'mongoose';

// Order item schema
const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  variant: {
    size: String,
    color: {
      name: String,
      value: String
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative']
  }
}, { _id: true });

// Shipping address schema
const ShippingAddressSchema = new mongoose.Schema({
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
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
}, { _id: false });

// Payment information schema
const PaymentInfoSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cash_on_delivery'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending'
  },
  transactionId: String,
  paymentGateway: String,
  paidAt: Date,
  refundedAt: Date,
  refundAmount: {
    type: Number,
    min: 0,
    default: 0
  }
}, { _id: false });

// Order tracking schema
const OrderTrackingSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'],
    required: true
  },
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: String,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { _id: true });

// Main Order schema
const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerInfo: {
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone: String
  },
  items: {
    type: [OrderItemSchema],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'Order must contain at least one item'
    }
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  taxAmount: {
    type: Number,
    required: true,
    min: [0, 'Tax amount cannot be negative'],
    default: 0
  },
  shippingAmount: {
    type: Number,
    required: true,
    min: [0, 'Shipping amount cannot be negative'],
    default: 0
  },
  discountAmount: {
    type: Number,
    min: [0, 'Discount amount cannot be negative'],
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  paymentInfo: {
    type: PaymentInfoSchema,
    required: true
  },
  shippingAddress: {
    type: ShippingAddressSchema,
    required: true
  },
  billingAddress: {
    type: ShippingAddressSchema,
    required: true
  },
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'overnight', 'pickup'],
    default: 'standard'
  },
  trackingNumber: String,
  carrierName: String,
  estimatedDeliveryDate: Date,
  actualDeliveryDate: Date,
  orderTracking: [OrderTrackingSchema],
  notes: {
    customer: String,
    internal: String
  },
  couponCode: String,
  source: {
    type: String,
    enum: ['web', 'mobile', 'admin', 'api'],
    default: 'web'
  },
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: String,
  cancellationReason: String,
  returnReason: String,
  refundRequested: {
    type: Boolean,
    default: false
  },
  refundProcessedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
OrderSchema?.index({ orderNumber: 1 });
OrderSchema?.index({ customer: 1, createdAt: -1 });
OrderSchema?.index({ status: 1 });
OrderSchema?.index({ 'paymentInfo.status': 1 });
OrderSchema?.index({ createdAt: -1 });
OrderSchema?.index({ trackingNumber: 1 });

// Virtual for total items count
OrderSchema?.virtual('totalItems')?.get(function() {
  return this.items?.reduce((total, item) => total + item?.quantity, 0) || 0;
});

// Virtual for order age in days
OrderSchema?.virtual('orderAgeInDays')?.get(function() {
  return Math.ceil((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to generate order number
OrderSchema?.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date?.getFullYear()?.toString()?.slice(-2);
    const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date?.getDate()?.toString()?.padStart(2, '0');
    
    // Find the last order of the day
    const lastOrder = await this.constructor?.findOne({
      orderNumber: new RegExp(`^SNB${year}${month}${day}`)
    })?.sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder?.orderNumber?.slice(-4));
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `SNB${year}${month}${day}${sequence?.toString()?.padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to add order tracking entry
OrderSchema?.pre('save', function(next) {
  // If status is being modified, add tracking entry
  if (this.isModified('status') && !this.isNew) {
    this.orderTracking?.push({
      status: this.status,
      message: `Order status changed to ${this.status}`,
      timestamp: new Date()
    });
  }
  next();
});

// Static methods
OrderSchema.statics.findByCustomer = function(customerId) {
  return this.find({ customer: customerId })?.sort({ createdAt: -1 });
};

OrderSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

OrderSchema.statics.findRecentOrders = function(days = 30) {
  const startDate = new Date();
  startDate?.setDate(startDate?.getDate() - days);
  
  return this.find({ createdAt: { $gte: startDate } })?.sort({ createdAt: -1 });
};

OrderSchema.statics.getTotalSales = function(startDate, endDate) {
  const matchStage = {
    'paymentInfo.status': 'completed'
  };
  
  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = startDate;
    if (endDate) matchStage.createdAt.$lte = endDate;
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$totalAmount' },
        totalOrders: { $sum: 1 },
        averageOrderValue: { $avg: '$totalAmount' }
      }
    }
  ]);
};

// Instance methods
OrderSchema.methods.addTrackingUpdate = function(status, message, location = null) {
  this.orderTracking?.push({
    status,
    message,
    location,
    timestamp: new Date()
  });
  this.status = status;
  return this.save();
};

OrderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items?.reduce((total, item) => total + item?.totalPrice, 0);
  this.totalAmount = this.subtotal + this.taxAmount + this.shippingAmount - this.discountAmount;
  return this;
};

OrderSchema.methods.canBeCancelled = function() {
  return ['pending', 'confirmed']?.includes(this.status);
};

OrderSchema.methods.canBeReturned = function() {
  return this.status === 'delivered' && this.orderAgeInDays <= 30;
};

export default mongoose?.model('Order', OrderSchema);