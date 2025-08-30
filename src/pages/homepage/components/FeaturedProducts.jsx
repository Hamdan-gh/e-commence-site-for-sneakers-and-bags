import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('featured');

  const productSections = {
    featured: {
      title: 'Featured Products',
      subtitle: 'Handpicked favorites from our collection'
    },
    newArrivals: {
      title: 'New Arrivals',
      subtitle: 'Fresh styles just landed'
    },
    bestSellers: {
      title: 'Best Sellers',
      subtitle: 'Most popular items this month'
    }
  };

  const products = [
    {
      id: 1,
      name: 'Nike Air Max 270',
      category: 'Sneakers',
      price: 450.00,
      originalPrice: 550.00,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isBestSeller: true,
      colors: ['black', 'white', 'red'],
      sizes: ['40', '41', '42', '43', '44']
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 22',
      category: 'Sneakers',
      price: 380.00,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 89,
      isBestSeller: true,
      colors: ['white', 'black', 'blue'],
      sizes: ['39', '40', '41', '42', '43']
    },
    {
      id: 3,
      name: 'Premium Leather Backpack',
      category: 'Bags',
      price: 220.00,
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 156,
      isNew: true,
      colors: ['brown', 'black', 'tan'],
      sizes: ['One Size']
    },
    {
      id: 4,
      name: 'Jordan 1 Retro High',
      category: 'Sneakers',
      price: 520.00,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 203,
      isBestSeller: true,
      colors: ['red', 'black', 'white'],
      sizes: ['40', '41', '42', '43', '44', '45']
    },
    {
      id: 5,
      name: 'Designer Handbag',
      category: 'Bags',
      price: 180.00,
      originalPrice: 250.00,
      image: 'https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?w=400&h=400&fit=crop',
      rating: 4.5,
      reviews: 67,
      isNew: true,
      colors: ['black', 'brown', 'beige'],
      sizes: ['One Size']
    },
    {
      id: 6,
      name: 'Converse Chuck Taylor',
      category: 'Sneakers',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop',
      rating: 4.4,
      reviews: 312,
      isBestSeller: true,
      colors: ['white', 'black', 'red', 'blue'],
      sizes: ['38', '39', '40', '41', '42', '43']
    }
  ];

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'newArrivals':
        return products?.filter(product => product?.isNew);
      case 'bestSellers':
        return products?.filter(product => product?.isBestSeller);
      default:
        return products;
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product?.originalPrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
            <Icon name="Heart" size={16} />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
            <Icon name="Eye" size={16} />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <Button variant="default" size="sm" fullWidth iconName="ShoppingCart" iconPosition="left">
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{product?.category}</p>
            <h3 className="font-medium text-gray-900 truncate">{product?.name}</h3>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={`${
                  i < Math.floor(product?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product?.reviews})</span>
        </div>

        {/* Colors */}
        <div className="flex items-center space-x-1 mb-3">
          {product?.colors?.slice(0, 4)?.map((color, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border border-gray-300 ${
                color === 'black' ? 'bg-black' :
                color === 'white' ? 'bg-white' :
                color === 'red' ? 'bg-red-500' :
                color === 'blue' ? 'bg-blue-500' :
                color === 'brown' ? 'bg-amber-800' :
                color === 'tan' ? 'bg-amber-200' :
                color === 'beige'? 'bg-amber-100' : 'bg-gray-400'
              }`}
            />
          ))}
          {product?.colors?.length > 4 && (
            <span className="text-xs text-gray-500">+{product?.colors?.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">
            GH₵ {product?.price?.toFixed(2)}
          </span>
          {product?.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              GH₵ {product?.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              {Object.entries(productSections)?.map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === key
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section?.title}
                </button>
              ))}
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {productSections?.[activeTab]?.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {productSections?.[activeTab]?.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {getFilteredProducts()?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;