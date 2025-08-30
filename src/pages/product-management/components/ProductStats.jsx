import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductStats = ({ products }) => {
  const stats = {
    total: products?.length,
    active: products?.filter(p => p?.status === 'active')?.length,
    inactive: products?.filter(p => p?.status === 'inactive')?.length,
    outOfStock: products?.filter(p => p?.status === 'out-of-stock')?.length,
    lowStock: products?.filter(p => p?.stock > 0 && p?.stock <= 10)?.length,
    totalValue: products?.reduce((sum, p) => sum + (p?.price * p?.stock), 0),
    categories: {
      sneakers: products?.filter(p => p?.category === 'sneakers')?.length,
      bags: products?.filter(p => p?.category === 'bags')?.length
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.total,
      icon: 'Package',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Products',
      value: stats?.active,
      icon: 'CheckCircle',
      color: 'text-success',
      bg: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Low Stock',
      value: stats?.lowStock,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bg: 'bg-warning/10',
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStock,
      icon: 'XCircle',
      color: 'text-error',
      bg: 'bg-error/10',
      change: '+2%',
      changeType: 'negative'
    },
    {
      title: 'Inventory Value',
      value: `GH₵ ${stats?.totalValue?.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-accent',
      bg: 'bg-accent/10',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Categories',
      value: `${stats?.categories?.sneakers}/${stats?.categories?.bags}`,
      icon: 'Grid3X3',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      subtitle: 'Sneakers/Bags',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-150">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bg} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat?.value}
            </h3>
            <p className="text-sm font-medium text-gray-600">
              {stat?.title}
            </p>
            {stat?.subtitle && (
              <p className="text-xs text-gray-500 mt-1">
                {stat?.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;