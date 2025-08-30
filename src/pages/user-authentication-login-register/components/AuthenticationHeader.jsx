import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthenticationHeader = ({ mode }) => {
  return (
    <div className="w-full">
      {/* Logo and Brand */}
      <div className="text-center mb-8">
        <Link to="/homepage" className="inline-flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="ShoppingBag" size={24} color="white" />
          </div>
          <span className="text-2xl font-bold text-primary">SneaksNBags</span>
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back!' : 'Join SneaksNBags'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ?'Sign in to access your account and continue shopping' :'Create your account to start shopping for the latest sneakers and bags'
            }
          </p>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/homepage" className="hover:text-primary transition-colors duration-150">
          Home
        </Link>
        <Icon name="ChevronRight" size={16} />
        <span className="text-gray-900">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </span>
      </div>

      {/* Mobile Back Button */}
      <div className="flex justify-start mb-6 lg:hidden">
        <Link to="/homepage">
          <Button variant="ghost" size="sm" iconName="ArrowLeft" iconPosition="left">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthenticationHeader;