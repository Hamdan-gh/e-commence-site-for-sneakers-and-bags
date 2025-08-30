import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return `GH₵ ${amount?.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toLocaleString(),
      change: stats?.totalOrdersChange,
      icon: 'ShoppingCart',
      color: 'blue'
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders?.toLocaleString(),
      change: stats?.pendingOrdersChange,
      icon: 'Clock',
      color: 'yellow'
    },
    {
      title: 'Revenue Today',
      value: formatCurrency(stats?.revenueToday),
      change: stats?.revenueTodayChange,
      icon: 'DollarSign',
      color: 'green'
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(stats?.avgOrderValue),
      change: stats?.avgOrderValueChange,
      icon: 'TrendingUp',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colors?.[color] || 'bg-gray-50 text-gray-600';
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat?.title}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">{stat?.value}</p>
              {stat?.change !== undefined && (
                <div className="flex items-center mt-2">
                  <Icon 
                    name={stat?.change >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={16} 
                    className={getChangeColor(stat?.change)}
                  />
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(stat?.change)}`}>
                    {stat?.change >= 0 ? '+' : ''}{stat?.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;