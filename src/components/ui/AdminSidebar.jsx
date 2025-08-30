import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const navigation = [
    {
      name: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'BarChart3',
      description: 'Overview & Analytics'
    },
    {
      name: 'Products',
      path: '/product-management',
      icon: 'Package',
      description: 'Inventory Management',
      badge: '24'
    },
    {
      name: 'Orders',
      path: '/order-management',
      icon: 'ShoppingCart',
      description: 'Order Processing',
      badge: '12'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev?.[sectionName]
    }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-primary">Admin Panel</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="shrink-0"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 group ${
                  isActivePath(item?.path)
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                title={isCollapsed ? item?.name : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`shrink-0 ${isActivePath(item?.path) ? 'text-accent-foreground' : ''}`}
                />
                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item?.name}</span>
                        {item?.badge && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                            isActivePath(item?.path)
                              ? 'bg-accent-foreground/20 text-accent-foreground'
                              : 'bg-accent text-accent-foreground'
                          }`}>
                            {item?.badge}
                          </span>
                        )}
                      </div>
                      {item?.description && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {item?.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {isCollapsed && item?.badge && (
                  <span className="absolute left-8 top-2 w-2 h-2 bg-accent rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="gray" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@sneaksnbags.com</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="LogOut" size={16} />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="w-full">
                <Icon name="User" size={20} />
              </Button>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isCollapsed ? 'hidden' : ''}`}>
        <div className="fixed inset-0 bg-black/50" onClick={onToggleCollapse}></div>
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-primary">Admin Panel</span>
              </div>
              <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={onToggleCollapse}
                >
                  <Icon name={item?.icon} size={20} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item?.name}</span>
                      {item?.badge && (
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                          isActivePath(item?.path)
                            ? 'bg-accent-foreground/20 text-accent-foreground'
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          {item?.badge}
                        </span>
                      )}
                    </div>
                    {item?.description && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {item?.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="gray" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@sneaksnbags.com</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="LogOut" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {/* Content Spacer for Desktop */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}></div>
    </>
  );
};

export default AdminSidebar;