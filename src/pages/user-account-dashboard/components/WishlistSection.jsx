import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Nike Air Force 1 Low',
      brand: 'Nike',
      price: 350.00,
      originalPrice: 420.00,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      inStock: true,
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      colors: ['White', 'Black', 'Red'],
      rating: 4.8,
      reviews: 124,
      addedDate: '2025-01-20'
    },
    {
      id: 2,
      name: 'Leather Messenger Bag',
      brand: 'Premium Leather Co.',
      price: 280.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      inStock: true,
      sizes: null,
      colors: ['Brown', 'Black', 'Tan'],
      rating: 4.6,
      reviews: 89,
      addedDate: '2025-01-18'
    },
    {
      id: 3,
      name: 'Adidas Stan Smith',
      brand: 'Adidas',
      price: 220.00,
      originalPrice: 250.00,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
      inStock: false,
      sizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: ['White/Green', 'White/Navy'],
      rating: 4.7,
      reviews: 256,
      addedDate: '2025-01-15'
    },
    {
      id: 4,
      name: 'Canvas Backpack',
      brand: 'Urban Explorer',
      price: 150.00,
      originalPrice: 180.00,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      inStock: true,
      sizes: null,
      colors: ['Navy', 'Olive', 'Black'],
      rating: 4.4,
      reviews: 67,
      addedDate: '2025-01-12'
    },
    {
      id: 5,
      name: 'Jordan 1 Retro High',
      brand: 'Jordan',
      price: 480.00,
      originalPrice: 520.00,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      inStock: true,
      sizes: ['UK 7.5', 'UK 8', 'UK 8.5', 'UK 9'],
      colors: ['Bred', 'Royal', 'Chicago'],
      rating: 4.9,
      reviews: 342,
      addedDate: '2025-01-10'
    },
    {
      id: 6,
      name: 'Minimalist Tote Bag',
      brand: 'Clean Design',
      price: 95.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      inStock: true,
      sizes: null,
      colors: ['Beige', 'Black', 'White'],
      rating: 4.3,
      reviews: 45,
      addedDate: '2025-01-08'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const handleRemoveItem = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
    setSelectedItems(prev => prev?.filter(id => id !== itemId));
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems?.length === filteredAndSortedItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedItems?.map(item => item?.id));
    }
  };

  const handleRemoveSelected = () => {
    if (window.confirm(`Remove ${selectedItems?.length} items from wishlist?`)) {
      setWishlistItems(prev => prev?.filter(item => !selectedItems?.includes(item?.id)));
      setSelectedItems([]);
    }
  };

  const handleAddToCart = (item) => {
    // Add to cart logic here
    console.log('Adding to cart:', item);
  };

  const formatCurrency = (amount) => {
    return `GH₵ ${amount?.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter and sort items
  const filteredAndSortedItems = wishlistItems?.filter(item => {
      if (filterBy === 'all') return true;
      if (filterBy === 'in-stock') return item?.inStock;
      if (filterBy === 'out-of-stock') return !item?.inStock;
      if (filterBy === 'on-sale') return item?.originalPrice && item?.originalPrice > item?.price;
      return true;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedDate) - new Date(a.addedDate);
        case 'oldest':
          return new Date(a.addedDate) - new Date(b.addedDate);
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
          <p className="text-sm text-gray-600 mt-1">
            {wishlistItems?.length} item{wishlistItems?.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        
        {selectedItems?.length > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedItems?.length} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={handleRemoveSelected}
            >
              Remove Selected
            </Button>
          </div>
        )}
      </div>
      {wishlistItems?.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Icon name="Heart" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-4">Save items you love to buy them later</p>
          <Button variant="default" iconName="ShoppingBag" iconPosition="left">
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedItems?.length === filteredAndSortedItems?.length && filteredAndSortedItems?.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <label htmlFor="selectAll" className="text-sm text-gray-700">
                    Select All
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Filter:</label>
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e?.target?.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="all">All Items</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="on-sale">On Sale</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems?.map((item) => (
              <div key={item?.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow duration-200">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200">
                    <div className="absolute top-3 left-3">
                      <input
                        type="checkbox"
                        checked={selectedItems?.includes(item?.id)}
                        onChange={() => handleSelectItem(item?.id)}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent bg-white"
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/90 hover:bg-white text-error hover:text-error"
                        onClick={() => handleRemoveItem(item?.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 flex flex-col space-y-1">
                    {!item?.inStock && (
                      <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
                        Out of Stock
                      </span>
                    )}
                    {item?.originalPrice && item?.originalPrice > item?.price && (
                      <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-medium">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{item?.brand}</p>
                    <h3 className="font-medium text-gray-900 line-clamp-2">{item?.name}</h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < Math.floor(item?.rating) ? 'text-accent fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {item?.rating} ({item?.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatCurrency(item?.price)}
                    </span>
                    {item?.originalPrice && item?.originalPrice > item?.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(item?.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Variants */}
                  <div className="space-y-2 mb-4">
                    {item?.sizes && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Available Sizes:</p>
                        <div className="flex flex-wrap gap-1">
                          {item?.sizes?.slice(0, 3)?.map((size, index) => (
                            <span key={size} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {size}
                            </span>
                          ))}
                          {item?.sizes?.length > 3 && (
                            <span className="text-xs text-gray-500">+{item?.sizes?.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Colors:</p>
                      <div className="flex flex-wrap gap-1">
                        {item?.colors?.slice(0, 2)?.map((color) => (
                          <span key={color} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                        {item?.colors?.length > 2 && (
                          <span className="text-xs text-gray-500">+{item?.colors?.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      variant={item?.inStock ? "default" : "outline"}
                      fullWidth
                      size="sm"
                      iconName="ShoppingCart"
                      iconPosition="left"
                      disabled={!item?.inStock}
                      onClick={() => handleAddToCart(item)}
                    >
                      {item?.inStock ? 'Add to Cart' : 'Notify When Available'}
                    </Button>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Added {formatDate(item?.addedDate)}</span>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedItems?.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more items</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistSection;