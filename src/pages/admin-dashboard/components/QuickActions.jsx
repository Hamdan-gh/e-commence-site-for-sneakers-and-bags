import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Product',
      description: 'Add sneakers or bags to inventory',
      icon: 'Plus',
      color: 'success',
      action: () => console.log('Add product')
    },
    {
      title: 'Process Orders',
      description: 'Review and update order status',
      icon: 'ShoppingCart',
      color: 'accent',
      action: () => console.log('Process orders')
    },
    {
      title: 'Customer Support',
      description: 'View customer inquiries',
      icon: 'MessageCircle',
      color: 'primary',
      action: () => console.log('Customer support')
    },
    {
      title: 'Generate Report',
      description: 'Export sales and analytics data',
      icon: 'FileText',
      color: 'warning',
      action: () => console.log('Generate report')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      success: 'bg-success hover:bg-success/90',
      accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
      primary: 'bg-primary hover:bg-primary/90',
      warning: 'bg-warning hover:bg-warning/90 text-warning-foreground'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-600">Common administrative tasks</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.action}
            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 text-left group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(action?.color)} group-hover:scale-105 transition-transform duration-150`}>
              <Icon name={action?.icon} size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {action?.title}
              </p>
              <p className="text-xs text-gray-600">
                {action?.description}
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;