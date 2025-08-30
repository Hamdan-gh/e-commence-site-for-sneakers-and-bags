import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TopProductsCard = () => {
  const topProducts = [
    {
      id: 1,
      name: 'Nike Air Max 270',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      sales: 145,
      revenue: 43500,
      stock: 23,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 22',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
      sales: 128,
      revenue: 38400,
      stock: 15,
      trend: 'up'
    },
    {
      id: 3,
      name: 'Louis Vuitton Handbag',
      category: 'Bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      sales: 89,
      revenue: 89000,
      stock: 8,
      trend: 'down'
    },
    {
      id: 4,
      name: 'Puma RS-X',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      sales: 76,
      revenue: 22800,
      stock: 31,
      trend: 'up'
    },
    {
      id: 5,
      name: 'Gucci Crossbody Bag',
      category: 'Bags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      sales: 65,
      revenue: 65000,
      stock: 5,
      trend: 'down'
    }
  ];

  const getStockStatus = (stock) => {
    if (stock <= 10) return { color: 'text-error', bg: 'bg-error/10', label: 'Low Stock' };
    if (stock <= 20) return { color: 'text-warning', bg: 'bg-warning/10', label: 'Medium' };
    return { color: 'text-success', bg: 'bg-success/10', label: 'In Stock' };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <p className="text-sm text-gray-600">Best selling items this month</p>
        </div>
        <Icon name="TrendingUp" size={20} className="text-success" />
      </div>
      <div className="space-y-4">
        {topProducts?.map((product, index) => (
          <div key={product?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
              {index + 1}
            </div>
            
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image 
                src={product?.image} 
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product?.name}
                </p>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={product?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={product?.trend === 'up' ? 'text-success' : 'text-error'}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">{product?.category}</span>
                  <span className="text-xs font-medium text-gray-900">
                    {product?.sales} sold
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-gray-900">
                    GH₵ {product?.revenue?.toLocaleString()}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStockStatus(product?.stock)?.bg} ${getStockStatus(product?.stock)?.color}`}>
                    {product?.stock}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-150">
          View All Products →
        </button>
      </div>
    </div>
  );
};

export default TopProductsCard;