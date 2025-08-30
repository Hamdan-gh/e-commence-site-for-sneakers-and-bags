import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuthenticationForm = ({ mode, onModeChange, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (mode === 'register') {
      if (!formData?.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData?.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData?.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9+\-\s()]+$/?.test(formData?.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mode Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
        <button
          type="button"
          onClick={() => onModeChange('login')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            mode === 'login' ?'bg-white text-primary shadow-sm' :'text-gray-600 hover:text-primary'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => onModeChange('register')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            mode === 'register' ?'bg-white text-primary shadow-sm' :'text-gray-600 hover:text-primary'
          }`}
        >
          Sign Up
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {mode === 'register' && (
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        )}

        {/* Checkboxes */}
        <div className="space-y-4">
          {mode === 'login' && (
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
          )}

          {mode === 'register' && (
            <Checkbox
              label="I agree to the Terms and Conditions and Privacy Policy"
              name="acceptTerms"
              checked={formData?.acceptTerms}
              onChange={handleInputChange}
              error={errors?.acceptTerms}
              required
            />
          )}
        </div>

        {/* Submit Button */}
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

        {/* Forgot Password Link */}
        {mode === 'login' && (
          <div className="text-center">
            <Button variant="link" size="sm">
              Forgot your password?
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthenticationForm;