import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, trend, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-warning-foreground',
    accent: 'bg-accent text-accent-foreground'
  };

  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-gray-500';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <Icon name={trendIcon} size={16} className={trendColor} />
              <span className={`text-sm font-medium ${trendColor}`}>
                {change}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;