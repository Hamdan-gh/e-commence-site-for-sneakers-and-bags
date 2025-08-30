import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationModal = ({ isOpen = false, onClose, onAuthenticate, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
      });
      setErrors({});
    }
  }, [isOpen, defaultMode]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData?.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onAuthenticate) {
        onAuthenticate({
          mode,
          userData: formData
        });
      }
      
      onClose();
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {mode === 'login' ?'Sign in to your SneaksNBags account' :'Join the SneaksNBags community'
              }
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData?.firstName}
                onChange={handleInputChange}
                error={errors?.firstName}
                placeholder="Enter first name"
                required
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData?.lastName}
                onChange={handleInputChange}
                error={errors?.lastName}
                placeholder="Enter last name"
                required
              />
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            placeholder="Enter your email"
            required
          />

          {mode === 'register' && (
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              placeholder="Enter phone number"
              required
            />
          )}

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            placeholder="Enter your password"
            required
          />

          {mode === 'register' && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              placeholder="Confirm your password"
              required
            />
          )}

          {errors?.submit && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors?.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4 pt-2">
            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isLoading}
              iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
              iconPosition="left"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            {mode === 'login' && (
              <div className="text-center">
                <Button variant="link" size="sm">
                  Forgot your password?
                </Button>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              fullWidth
              iconName="Smartphone"
              iconPosition="left"
            >
              Continue with Mobile Money
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
          <p className="text-sm text-center text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="font-medium text-accent hover:text-accent/80 transition-colors duration-150"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;