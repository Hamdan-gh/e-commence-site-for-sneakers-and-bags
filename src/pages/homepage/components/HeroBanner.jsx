import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const banners = [
    {
      id: 1,
      title: "Latest Sneaker Collection",
      subtitle: "Step into style with our premium sneakers",
      description: "Discover the hottest trends in footwear with up to 30% off selected items",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=600&fit=crop",
      ctaText: "Shop Sneakers",
      ctaLink: "/products/sneakers",
      bgColor: "from-gray-900 to-gray-700"
    },
    {
      id: 2,
      title: "Premium Bags Collection",
      subtitle: "Carry your essentials in style",
      description: "From backpacks to handbags, find the perfect bag for every occasion",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=1200&h=600&fit=crop",
      ctaText: "Shop Bags",
      ctaLink: "/products/bags",
      bgColor: "from-amber-900 to-amber-700"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh styles just landed",
      description: "Be the first to get your hands on our newest collection",
      image: "https://images.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg?w=1200&h=600&fit=crop",
      ctaText: "Explore New",
      ctaLink: "/products/new-arrivals",
      bgColor: "from-blue-900 to-blue-700"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners?.length) % banners?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {banners?.map((banner, index) => (
          <div
            key={banner?.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banner?.image}
                alt={banner?.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner?.bgColor} opacity-60`}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {banner?.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-2">
                    {banner?.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-gray-300 mb-8 max-w-lg">
                    {banner?.description}
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {banner?.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={20} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {banners?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-xs text-white">Auto</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;