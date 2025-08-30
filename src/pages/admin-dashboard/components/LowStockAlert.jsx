import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LowStockAlert = () => {
  const lowStockItems = [
    {
      id: 1,
      name: 'Nike Air Force 1',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      currentStock: 3,
      minStock: 10,
      supplier: 'Nike Ghana Ltd',
      lastRestocked: '2025-01-15'
    },
    {
      id: 2,
      name: 'Adidas Backpack',
      category: 'Bags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      currentStock: 5,
      minStock: 15,
      supplier: 'Adidas Ghana',
      lastRestocked: '2025-01-20'
    },
    {
      id: 3,
      name: 'Puma Suede Classic',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      currentStock: 7,
      minStock: 20,
      supplier: 'Puma Distribution',
      lastRestocked: '2025-01-10'
    },
    {
      id: 4,
      name: 'Canvas Tote Bag',
      category: 'Bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      currentStock: 2,
      minStock: 12,
      supplier: 'Local Supplier',
      lastRestocked: '2025-01-25'
    }
  ];

  const getUrgencyLevel = (current, min) => {
    const percentage = (current / min) * 100;
    if (percentage <= 25) return { level: 'critical', color: 'text-error', bg: 'bg-error/10' };
    if (percentage <= 50) return { level: 'low', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'medium', color: 'text-accent', bg: 'bg-accent/10' };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
            <p className="text-sm text-gray-600">Items requiring restocking</p>
          </div>
        </div>
        <span className="bg-error/10 text-error text-xs font-medium px-2 py-1 rounded-full">
          {lowStockItems?.length} items
        </span>
      </div>
      <div className="space-y-4">
        {lowStockItems?.map((item) => {
          const urgency = getUrgencyLevel(item?.currentStock, item?.minStock);
          
          return (
            <div key={item?.id} className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-150">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image 
                  src={item?.image} 
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item?.name}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgency?.bg} ${urgency?.color}`}>
                    {item?.currentStock} left
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item?.category} • {item?.supplier}</span>
                  <span>Min: {item?.minStock}</span>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        urgency?.level === 'critical' ? 'bg-error' : 
                        urgency?.level === 'low' ? 'bg-warning' : 'bg-accent'
                      }`}
                      style={{ width: `${Math.min((item?.currentStock / item?.minStock) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                Restock
              </Button>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button variant="outline" fullWidth iconName="Package" iconPosition="left">
          Manage All Inventory
        </Button>
      </div>
    </div>
  );
};

export default LowStockAlert;