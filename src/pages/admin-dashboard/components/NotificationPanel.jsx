import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-2025-006 from Kwame Asante for GH₵ 450.00',
      time: '2 minutes ago',
      read: false,
      icon: 'ShoppingCart',
      color: 'text-accent'
    },
    {
      id: 2,
      type: 'stock',
      title: 'Low Stock Alert',
      message: 'Nike Air Force 1 has only 3 units remaining',
      time: '15 minutes ago',
      read: false,
      icon: 'AlertTriangle',
      color: 'text-warning'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Confirmed',
      message: 'Mobile Money payment of GH₵ 320.00 confirmed for Order #ORD-2025-005',
      time: '1 hour ago',
      read: true,
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'Inventory sync completed successfully',
      time: '2 hours ago',
      read: true,
      icon: 'Settings',
      color: 'text-primary'
    },
    {
      id: 5,
      type: 'customer',
      title: 'Customer Review',
      message: 'New 5-star review for Adidas Ultraboost 22',
      time: '3 hours ago',
      read: true,
      icon: 'Star',
      color: 'text-accent'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <p className="text-sm text-gray-600">Recent system alerts</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <span className="bg-error text-white text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications?.map((notification) => (
          <div 
            key={notification?.id}
            className={`flex items-start space-x-3 p-3 rounded-lg transition-colors duration-150 cursor-pointer ${
              notification?.read 
                ? 'hover:bg-gray-50' :'bg-accent/5 hover:bg-accent/10 border border-accent/20'
            }`}
            onClick={() => markAsRead(notification?.id)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              notification?.read ? 'bg-gray-100' : 'bg-white border border-gray-200'
            }`}>
              <Icon 
                name={notification?.icon} 
                size={16} 
                className={notification?.read ? 'text-gray-500' : notification?.color}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-medium ${
                  notification?.read ? 'text-gray-700' : 'text-gray-900'
                }`}>
                  {notification?.title}
                </p>
                {!notification?.read && (
                  <div className="w-2 h-2 bg-accent rounded-full shrink-0"></div>
                )}
              </div>
              
              <p className={`text-xs mb-1 ${
                notification?.read ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {notification?.message}
              </p>
              
              <p className="text-xs text-gray-400">
                {notification?.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button variant="outline" fullWidth iconName="Archive" iconPosition="left">
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationPanel;