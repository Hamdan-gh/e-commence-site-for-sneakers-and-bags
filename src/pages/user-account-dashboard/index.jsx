import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CustomerHeader from '../../components/ui/CustomerHeader';
import ProfileSection from './components/ProfileSection';
import OrdersSection from './components/OrdersSection';
import AddressesSection from './components/AddressesSection';
import WishlistSection from './components/WishlistSection';
import SettingsSection from './components/SettingsSection';

const UserAccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated] = useState(true);
  const [cartItemCount] = useState(3);

  // Mock user data
  const userData = {
    firstName: 'Kwame',
    lastName: 'Asante',
    email: 'kwame.asante@gmail.com',
    phone: '+233 24 123 4567',
    memberSince: '2023-06-15',
    totalOrders: 12,
    totalSpent: 2450.00
  };

  const tabs = [
    {
      id: 'profile',
      name: 'Profile',
      icon: 'User',
      description: 'Personal information'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: 'Package',
      description: 'Order history & tracking',
      badge: '3'
    },
    {
      id: 'addresses',
      name: 'Addresses',
      icon: 'MapPin',
      description: 'Delivery addresses'
    },
    {
      id: 'wishlist',
      name: 'Wishlist',
      icon: 'Heart',
      description: 'Saved items',
      badge: '6'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'Settings',
      description: 'Account preferences'
    }
  ];

  const formatCurrency = (amount) => {
    return `GH₵ ${amount?.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'orders':
        return <OrdersSection />;
      case 'addresses':
        return <AddressesSection />;
      case 'wishlist':
        return <WishlistSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ProfileSection />;
    }
  };

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader 
        isAuthenticated={isAuthenticated}
        cartItemCount={cartItemCount}
        onAuthClick={() => {}}
        onCartClick={() => {}}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {userData?.firstName}!
                </h1>
                <p className="text-gray-600">
                  Member since {formatDate(userData?.memberSince)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-center">
              <div>
                <p className="text-2xl font-bold text-accent">{userData?.totalOrders}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <p className="text-2xl font-bold text-accent">{formatCurrency(userData?.totalSpent)}</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-150 ${
                      activeTab === tab?.id
                        ? 'bg-accent text-accent-foreground shadow-sm'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={tab?.icon} 
                        size={20} 
                        className={activeTab === tab?.id ? 'text-accent-foreground' : ''}
                      />
                      <div>
                        <p className="font-medium">{tab?.name}</p>
                        <p className="text-xs opacity-75">{tab?.description}</p>
                      </div>
                    </div>
                    {tab?.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        activeTab === tab?.id
                          ? 'bg-accent-foreground/20 text-accent-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}>
                        {tab?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    to="/homepage"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
                  >
                    <Icon name="ShoppingBag" size={16} />
                    <span>Continue Shopping</span>
                  </Link>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150 w-full text-left">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150 w-full text-left">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <Button
                variant="outline"
                fullWidth
                iconName={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {tabs?.find(tab => tab?.id === activeTab)?.name}
              </Button>
              
              {isMobileMenuOpen && (
                <div className="mt-4 space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                        activeTab === tab?.id
                          ? 'bg-accent text-accent-foreground'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={tab?.icon} size={18} />
                        <span className="font-medium">{tab?.name}</span>
                      </div>
                      {tab?.badge && (
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          activeTab === tab?.id
                            ? 'bg-accent-foreground/20 text-accent-foreground'
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          {tab?.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-primary">SneaksNBags</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link to="/homepage" className="hover:text-primary transition-colors duration-150">
                Home
              </Link>
              <button className="hover:text-primary transition-colors duration-150">
                Help
              </button>
              <button className="hover:text-primary transition-colors duration-150">
                Privacy
              </button>
              <button className="hover:text-primary transition-colors duration-150">
                Terms
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© {new Date()?.getFullYear()} SneaksNBags. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserAccountDashboard;