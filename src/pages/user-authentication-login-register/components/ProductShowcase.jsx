import React from 'react';
import Image from '../../../components/AppImage';

const ProductShowcase = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: "GH₵ 450.00",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Sneakers"
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: "GH₵ 520.00",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
      category: "Sneakers"
    },
    {
      id: 3,
      name: "Louis Vuitton Handbag",
      price: "GH₵ 1,200.00",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category: "Bags"
    },
    {
      id: 4,
      name: "Gucci Crossbody Bag",
      price: "GH₵ 890.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Bags"
    }
  ];

  return (
    <div className="hidden lg:block w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="h-full flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Premium Fashion
          </h2>
          <p className="text-gray-600 text-lg">
            Latest sneakers and bags from top brands
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {featuredProducts?.map((product) => (
            <div key={product?.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                  {product?.category}
                </span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-1">
                  {product?.name}
                </h3>
                <p className="text-lg font-bold text-primary">
                  {product?.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🚚</div>
            <p className="text-sm font-medium text-gray-900">Free Delivery</p>
            <p className="text-xs text-gray-600">Nationwide</p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl mb-2">💳</div>
            <p className="text-sm font-medium text-gray-900">Mobile Money</p>
            <p className="text-xs text-gray-600">All Networks</p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm font-medium text-gray-900">Secure</p>
            <p className="text-xs text-gray-600">SSL Protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;