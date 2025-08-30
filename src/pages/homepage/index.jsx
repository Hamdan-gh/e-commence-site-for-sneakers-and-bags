import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CustomerHeader from '../../components/ui/CustomerHeader';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import MobileMenuDrawer from '../../components/ui/MobileMenuDrawer';
import HeroBanner from './components/HeroBanner';
import PromotionalStrips from './components/PromotionalStrips';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryNavigation from './components/CategoryNavigation';
import CustomerTestimonials from './components/CustomerTestimonials';
import Footer from './components/Footer';

const Homepage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthenticate = (authData) => {
    setIsAuthenticated(true);
    console.log('User authenticated:', authData);
  };

  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>SneaksNBags - Premium Sneakers & Bags in Ghana</title>
        <meta 
          name="description" 
          content="Discover the latest sneakers and stylish bags in Ghana. Free nationwide delivery, mobile money payments, and authentic products. Shop now at SneaksNBags!" 
        />
        <meta name="keywords" content="sneakers Ghana, bags Ghana, mobile money shopping, Nike Adidas Ghana, fashion accessories" />
        <meta property="og:title" content="SneaksNBags - Premium Sneakers & Bags in Ghana" />
        <meta property="og:description" content="Ghana's premier destination for authentic sneakers and stylish bags with nationwide delivery." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sneaksnbags.com/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <CustomerHeader
          isAuthenticated={isAuthenticated}
          cartItemCount={cartItemCount}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
        />

        {/* Main Content */}
        <main>
          {/* Hero Banner Section */}
          <section className="mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HeroBanner />
            </div>
          </section>

          {/* Promotional Strips */}
          <section>
            <PromotionalStrips />
          </section>

          {/* Featured Products */}
          <section>
            <FeaturedProducts />
          </section>

          {/* Category Navigation */}
          <section>
            <CategoryNavigation />
          </section>

          {/* Customer Testimonials */}
          <section>
            <CustomerTestimonials />
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <AuthenticationModal
          isOpen={isAuthModalOpen}
          onClose={handleAuthModalClose}
          onAuthenticate={handleAuthenticate}
          defaultMode="login"
        />

        <MobileMenuDrawer
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          isAuthenticated={isAuthenticated}
          cartItemCount={cartItemCount}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
        />
      </div>
    </>
  );
};

export default Homepage;