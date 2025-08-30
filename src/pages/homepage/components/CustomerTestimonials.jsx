import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Kwame Asante',
      location: 'Accra, Ghana',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: `Amazing quality sneakers! I ordered the Nike Air Max and it arrived within 2 days. The mobile money payment was so convenient. Will definitely shop here again!`,
      product: 'Nike Air Max 270',
      verified: true
    },
    {
      id: 2,
      name: 'Ama Osei',
      location: 'Kumasi, Ghana',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: `Love my new leather backpack! Perfect for work and the quality is outstanding. Customer service was very helpful when I had questions about sizing.`,
      product: 'Premium Leather Backpack',
      verified: true
    },
    {
      id: 3,
      name: 'Kofi Mensah',
      location: 'Tamale, Ghana',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      rating: 4,
      text: `Great selection of bags and fast delivery even to the Northern Region. The website is easy to use and payment with Vodafone Cash was seamless.`,
      product: 'Designer Handbag',
      verified: true
    },
    {
      id: 4,
      name: 'Akosua Frimpong',
      location: 'Cape Coast, Ghana',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      text: `Excellent shopping experience! The sneakers fit perfectly and the free delivery was a nice bonus. Highly recommend SneaksNBags to everyone!`,
      product: 'Adidas Ultraboost 22',
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real reviews from satisfied customers across Ghana
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {testimonials?.map((testimonial, index) => (
              <div
                key={testimonial?.id}
                className={`transition-all duration-500 ${
                  index === currentTestimonial ? 'block' : 'hidden'
                }`}
              >
                <div className="p-8 md:p-12">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="Quote" size={24} className="text-accent" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={20}
                          className={`${
                            i < testimonial?.rating 
                              ? 'text-yellow-400 fill-current' :'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed">
                    "{testimonial?.text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="relative">
                      <Image
                        src={testimonial?.avatar}
                        alt={testimonial?.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {testimonial?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} color="white" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial?.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-1">
                        {testimonial?.location}
                      </p>
                      <p className="text-xs text-accent font-medium">
                        Purchased: {testimonial?.product}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-accent' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">1000+</h3>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Star" size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">4.8/5</h3>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Truck" size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">99%</h3>
            <p className="text-sm text-gray-600">On-Time Delivery</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">100%</h3>
            <p className="text-sm text-gray-600">Secure Payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;