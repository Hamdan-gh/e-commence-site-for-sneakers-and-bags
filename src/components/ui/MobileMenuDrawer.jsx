import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileMenuDrawer = ({ 
  isOpen = false, 
  onClose, 
  isAuthenticated = false, 
  cartItemCount = 0,
  onAuthClick,
  onCartClick 
}) => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/homepage', icon: 'Home', description: 'Discover latest sneakers & bags' },
    { 
      name: 'Account', 
      path: isAuthenticated ? '/user-account-dashboard' : '/user-authentication-login-register', 
      icon: 'User',
      description: isAuthenticated ? 'Manage your profile' : 'Sign in to your account'
    },
  ];

  const quickActions = [
    { name: 'Search Products', icon: 'Search', action: 'search' },
    { name: 'Wishlist', icon: 'Heart', action: 'wishlist', badge: '3' },
    { name: 'Order History', icon: 'Package', action: 'orders' },
    { name: 'Help & Support', icon: 'HelpCircle', action: 'help' },
  ];

  const isActivePath = (path) => {
    if (path === '/homepage' && location?.pathname === '/') return true;
    return location?.pathname === path;
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleActionClick = (action) => {
    switch (action) {
      case 'search':
        // Handle search action
        break;
      case 'wishlist':
        // Handle wishlist action
        break;
      case 'orders':
        // Handle orders action
        break;
      case 'help':
        // Handle help action
        break;
      default:
        break;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-75 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-primary">SneaksNBags</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="gray" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Welcome back!</p>
                  <p className="text-sm text-gray-500">user@example.com</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-gray-200">
              <Button 
                variant="default" 
                fullWidth 
                iconName="LogIn" 
                iconPosition="left"
                onClick={() => {
                  onAuthClick();
                  onClose();
                }}
              >
                Sign In to Your Account
              </Button>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              {navigation?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-150 ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={onClose}
                >
                  <Icon name={item?.icon} size={20} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{item?.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Cart Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  onCartClick();
                  onClose();
                }}
                className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="ShoppingCart" size={20} />
                  <span className="font-medium">Shopping Cart</span>
                </div>
                {cartItemCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-sm rounded-full w-6 h-6 flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions?.map((item) => (
                  <button
                    key={item?.name}
                    onClick={() => handleActionClick(item?.action)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={18} />
                      <span className="text-sm">{item?.name}</span>
                    </div>
                    {item?.badge && (
                      <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {item?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>© 2025 SneaksNBags</span>
              <div className="flex items-center space-x-4">
                <button className="hover:text-primary transition-colors duration-150">
                  Privacy
                </button>
                <button className="hover:text-primary transition-colors duration-150">
                  Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;