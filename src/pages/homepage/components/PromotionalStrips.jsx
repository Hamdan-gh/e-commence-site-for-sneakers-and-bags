import React from 'react';
import Icon from '../../../components/AppIcon';

const PromotionalStrips = () => {
  const promotions = [
    {
      id: 1,
      icon: 'Truck',
      title: 'Free Delivery Nationwide',
      description: 'Free shipping on orders over GH₵ 200',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    {
      id: 2,
      icon: 'Smartphone',
      title: 'Mobile Money Accepted',
      description: 'Pay with MTN, Vodafone, AirtelTigo',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    },
    {
      id: 3,
      icon: 'Shield',
      title: 'Secure Shopping',
      description: '100% secure payment guarantee',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-800'
    },
    {
      id: 4,
      icon: 'RotateCcw',
      title: '7-Day Returns',
      description: 'Easy returns & exchanges',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Vertical Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promotions?.map((promo) => (
            <div
              key={promo?.id}
              className={`${promo?.bgColor} rounded-lg p-4 text-center transition-transform duration-200 hover:scale-105`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 ${promo?.iconColor} bg-white rounded-full flex items-center justify-center shadow-sm`}>
                  <Icon name={promo?.icon} size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${promo?.textColor}`}>
                    {promo?.title}
                  </h3>
                  <p className={`text-xs ${promo?.textColor} opacity-80 mt-1`}>
                    {promo?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Additional promotional banner */}
        <div className="hidden lg:block mt-8">
          <div className="bg-gradient-to-r from-accent to-amber-600 rounded-lg p-6 text-center text-white">
            <div className="flex items-center justify-center space-x-4">
              <Icon name="Zap" size={32} />
              <div>
                <h2 className="text-xl font-bold">Limited Time Offer!</h2>
                <p className="text-amber-100">Get 20% off your first order with code WELCOME20</p>
              </div>
              <Icon name="Zap" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalStrips;