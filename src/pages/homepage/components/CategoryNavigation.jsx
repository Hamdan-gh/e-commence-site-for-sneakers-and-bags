import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategoryNavigation = () => {
  const categories = [
    {
      id: 1,
      name: 'Sneakers',
      description: 'Premium footwear collection',
      productCount: 245,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop',
      link: '/products/sneakers',
      color: 'from-blue-600 to-blue-800',
      icon: 'Footprints'
    },
    {
      id: 2,
      name: 'Bags',
      description: 'Stylish bags & accessories',
      productCount: 156,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=600&h=400&fit=crop',
      link: '/products/bags',
      color: 'from-purple-600 to-purple-800',
      icon: 'ShoppingBag'
    }
  ];

  const subCategories = [
    {
      id: 1,
      name: 'Running Shoes',
      count: 89,
      icon: 'Zap',
      link: '/products/running-shoes'
    },
    {
      id: 2,
      name: 'Casual Sneakers',
      count: 124,
      icon: 'Star',
      link: '/products/casual-sneakers'
    },
    {
      id: 3,
      name: 'Backpacks',
      count: 67,
      icon: 'Package',
      link: '/products/backpacks'
    },
    {
      id: 4,
      name: 'Handbags',
      count: 45,
      icon: 'Heart',
      link: '/products/handbags'
    },
    {
      id: 5,
      name: 'Sports Bags',
      count: 32,
      icon: 'Target',
      link: '/products/sports-bags'
    },
    {
      id: 6,
      name: 'Travel Bags',
      count: 28,
      icon: 'MapPin',
      link: '/products/travel-bags'
    }
  ];

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of premium sneakers and stylish bags
          </p>
        </div>

        {/* Main Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              to={category?.link}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <div className="aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                <div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon name={category?.icon} size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {category?.name}
                  </h3>
                  <p className="text-sm md:text-base text-white/90 mb-2">
                    {category?.description}
                  </p>
                  <p className="text-sm text-white/80">
                    {category?.productCount} Products Available
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                      <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sub Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Categories
            </h3>
            <Link
              to="/categories"
              className="text-sm text-accent hover:text-accent/80 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subCategories?.map((subCategory) => (
              <Link
                key={subCategory?.id}
                to={subCategory?.link}
                className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                  <Icon name={subCategory?.icon} size={20} />
                </div>
                <h4 className="text-sm font-medium text-gray-900 text-center mb-1">
                  {subCategory?.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {subCategory?.count} items
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">400+</div>
            <div className="text-sm text-green-700">Total Products</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
            <div className="text-sm text-blue-700">Top Brands</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
            <div className="text-sm text-purple-700">Customer Support</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">1000+</div>
            <div className="text-sm text-orange-700">Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;