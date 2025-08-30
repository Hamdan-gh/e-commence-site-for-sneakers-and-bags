import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with SSL encryption'
    },
    {
      icon: 'CreditCard',
      title: 'Safe Payments',
      description: 'Paystack & Flutterwave secured payments'
    },
    {
      icon: 'Truck',
      title: 'Nationwide Delivery',
      description: 'Free delivery across Ghana'
    },
    {
      icon: 'Users',
      title: '10,000+ Happy Customers',
      description: 'Join our growing community'
    }
  ];

  const paymentLogos = [
    { name: 'MTN Mobile Money', color: 'text-yellow-500' },
    { name: 'Vodafone Cash', color: 'text-red-500' },
    { name: 'AirtelTigo Money', color: 'text-blue-500' }
  ];

  return (
    <div className="w-full">
      {/* Trust Features */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={feature?.icon} size={20} className="text-accent" />
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">{feature?.title}</h4>
            <p className="text-xs text-gray-600">{feature?.description}</p>
          </div>
        ))}
      </div>
      {/* Payment Methods */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 text-center">
          Accepted Payment Methods
        </h4>
        <div className="flex items-center justify-center space-x-4">
          {paymentLogos?.map((payment, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Icon name="Smartphone" size={16} className={payment?.color} />
              <span className="text-xs text-gray-600">{payment?.name?.split(' ')?.[0]}</span>
            </div>
          ))}
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} className="text-gray-600" />
            <span className="text-xs text-gray-600">Cards</span>
          </div>
        </div>
      </div>
      {/* Security Badge */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <Icon name="Lock" size={16} className="text-green-600" />
        <span className="text-xs text-gray-600">256-bit SSL Secured</span>
        <Icon name="CheckCircle" size={16} className="text-green-600" />
        <span className="text-xs text-gray-600">GDPR Compliant</span>
      </div>
    </div>
  );
};

export default TrustIndicators;