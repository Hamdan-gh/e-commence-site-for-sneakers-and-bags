import React from 'react';

import Button from '../../../components/ui/Button';

const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or continue with</span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            type="button"
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin(provider?.name?.toLowerCase())}
            disabled={isLoading}
            iconName={provider?.icon}
            iconPosition="left"
            className="justify-center"
          >
            Continue with {provider?.name}
          </Button>
        ))}
      </div>
      {/* Mobile Money Option */}
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin('mobile-money')}
          disabled={isLoading}
          iconName="Smartphone"
          iconPosition="left"
          className="justify-center border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          Continue with Mobile Money
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;