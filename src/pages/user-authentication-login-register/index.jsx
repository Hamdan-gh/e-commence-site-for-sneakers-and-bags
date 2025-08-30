import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthenticationHeader from './components/AuthenticationHeader';
import AuthenticationForm from './components/AuthenticationForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import TrustIndicators from './components/TrustIndicators';
import ProductShowcase from './components/ProductShowcase';

const UserAuthenticationPage = () => {
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for testing
  const mockCredentials = {
    email: "user@sneaksnbags.com",
    password: "password123"
  };

  useEffect(() => {
    // Check if there's a preferred mode from URL params or state
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams?.get('mode');
    if (modeParam === 'register') {
      setMode('register');
    }
  }, [location]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // Update URL without page reload
    const searchParams = new URLSearchParams(location.search);
    if (newMode === 'register') {
      searchParams?.set('mode', 'register');
    } else {
      searchParams?.delete('mode');
    }
    const newSearch = searchParams?.toString();
    const newUrl = `${location?.pathname}${newSearch ? `?${newSearch}` : ''}`;
    window.history?.replaceState(null, '', newUrl);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'login') {
        // Check mock credentials
        if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
          // Successful login
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData?.email);
          
          // Redirect to intended destination or dashboard
          const from = location?.state?.from?.pathname || '/user-account-dashboard';
          navigate(from, { replace: true });
        } else {
          // Invalid credentials
          alert(`Invalid credentials. Use:\nEmail: ${mockCredentials?.email}\nPassword: ${mockCredentials?.password}`);
        }
      } else {
        // Registration successful
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('userName', `${formData?.firstName} ${formData?.lastName}`);
        
        // Redirect to dashboard after registration
        navigate('/user-account-dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('userName', `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`);
      
      const from = location?.state?.from?.pathname || '/user-account-dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Social login error:', error);
      alert('Social login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-8">
          <AuthenticationHeader mode={mode} />
          
          <div className="max-w-md mx-auto space-y-8">
            <AuthenticationForm
              mode={mode}
              onModeChange={handleModeChange}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
            
            <SocialLoginButtons
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />
            
            <TrustIndicators />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Panel - Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <AuthenticationHeader mode={mode} />
            
            <AuthenticationForm
              mode={mode}
              onModeChange={handleModeChange}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
            
            <SocialLoginButtons
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />
            
            <TrustIndicators />
          </div>
        </div>

        {/* Right Panel - Product Showcase */}
        <div className="flex-1">
          <ProductShowcase />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-gray-900 font-medium">
              {mode === 'login' ? 'Signing you in...' : 'Creating your account...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthenticationPage;