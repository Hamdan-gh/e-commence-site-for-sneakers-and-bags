import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CustomerHeader = ({ isAuthenticated = false, cartItemCount = 0, onAuthClick, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Account', path: isAuthenticated ? '/user-account-dashboard' : '/user-authentication-login-register', icon: 'User' },
  ];

  const isActivePath = (path) => {
    if (path === '/homepage' && location?.pathname === '/') return true;
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-primary">SneaksNBags</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Search" size={20} />
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={onCartClick}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Button>

              {/* Auth Button */}
              {!isAuthenticated && (
                <Button variant="default" onClick={onAuthClick}>
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {navigation?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-150 ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Icon name="Search" size={18} />
                  <span>Search</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-2 relative"
                  onClick={onCartClick}
                >
                  <Icon name="ShoppingCart" size={18} />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </Button>
                
                {!isAuthenticated && (
                  <Button variant="default" size="sm" onClick={onAuthClick}>
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default CustomerHeader;