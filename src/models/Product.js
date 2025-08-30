import mongoose from 'mongoose';

// Product variant schema
const ProductVariantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    }
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  price: {
    type: String,
    required: true
  }
}, { _id: true });

// Product image schema
const ProductImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  alt: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: true });

// Product dimensions schema
const DimensionsSchema = new mongoose.Schema({
  length: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  }
}, { _id: false });

// Main Product schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxLength: [200, 'Product name cannot exceed 200 characters']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
    maxLength: [100, 'Brand name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['sneakers', 'bags'],
    lowercase: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative'],
    validate: {
      validator: function(value) {
        return !value || value >= this.price;
      },
      message: 'Compare price should be greater than or equal to regular price'
    }
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out-of-stock', 'discontinued'],
    default: 'active'
  },
  image: {
    type: String,
    required: [true, 'Main product image is required'],
    trim: true
  },
  images: [ProductImageSchema],
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxLength: [2000, 'Description cannot exceed 2000 characters']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  barcode: {
    type: String,
    required: [true, 'Barcode is required'],
    unique: true,
    trim: true
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    type: DimensionsSchema,
    required: true
  },
  seoTitle: {
    type: String,
    trim: true,
    maxLength: [160, 'SEO title cannot exceed 160 characters']
  },
  seoDescription: {
    type: String,
    trim: true,
    maxLength: [300, 'SEO description cannot exceed 300 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  variants: [ProductVariantSchema],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
ProductSchema?.index({ name: 'text', brand: 'text', description: 'text' });
ProductSchema?.index({ category: 1, brand: 1 });
ProductSchema?.index({ status: 1 });
ProductSchema?.index({ price: 1 });
ProductSchema?.index({ sku: 1 });
ProductSchema?.index({ barcode: 1 });
ProductSchema?.index({ createdAt: -1 });
ProductSchema?.index({ isDeleted: 1 });

// Virtual for calculating total variant stock
ProductSchema?.virtual('totalVariantStock')?.get(function() {
  return this.variants?.reduce((total, variant) => total + (variant?.stock || 0), 0) || 0;
});

// Virtual for checking if product is on sale
ProductSchema?.virtual('isOnSale')?.get(function() {
  return this.comparePrice && this.comparePrice > this.price;
});

// Virtual for discount percentage
ProductSchema?.virtual('discountPercentage')?.get(function() {
  if (!this.comparePrice || this.comparePrice <= this.price) return 0;
  return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
});

// Pre-save middleware to update stock based on variants
ProductSchema?.pre('save', function(next) {
  if (this.variants && this.variants?.length > 0) {
    this.stock = this.totalVariantStock;
  }
  
  // Auto-update status based on stock
  if (this.stock === 0 && this.status === 'active') {
    this.status = 'out-of-stock';
  } else if (this.stock > 0 && this.status === 'out-of-stock') {
    this.status = 'active';
  }
  
  next();
});

// Static methods for common queries
ProductSchema.statics.findActiveProducts = function() {
  return this.find({ status: 'active', isDeleted: false });
};

ProductSchema.statics.findByCategory = function(category) {
  return this.find({ category, isDeleted: false });
};

ProductSchema.statics.findLowStockProducts = function(threshold = 5) {
  return this.find({ 
    stock: { $lt: threshold, $gt: 0 }, 
    status: 'active', 
    isDeleted: false 
  });
};

ProductSchema.statics.searchProducts = function(searchTerm) {
  return this.find({
    $text: { $search: searchTerm },
    isDeleted: false
  })?.sort({ score: { $meta: 'textScore' } });
};

// Instance methods
ProductSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.status = 'discontinued';
  return this.save();
};

ProductSchema.methods.restore = function() {
  this.isDeleted = false;
  if (this.stock > 0) {
    this.status = 'active';
  }
  return this.save();
};

export default mongoose?.model('Product', ProductSchema);