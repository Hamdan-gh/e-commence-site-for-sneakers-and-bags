import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/story' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' }
      ]
    },
    customer: {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Help Center', href: '/help' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Returns & Exchanges', href: '/returns' }
      ]
    },
    policies: {
      title: 'Policies',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Shipping Policy', href: '/shipping' },
        { name: 'Refund Policy', href: '/refunds' }
      ]
    }
  };

  const paymentMethods = [
    { name: 'MTN Mobile Money', icon: 'Smartphone' },
    { name: 'Vodafone Cash', icon: 'CreditCard' },
    { name: 'AirtelTigo Money', icon: 'Wallet' },
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/sneaksnbags' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/sneaksnbags' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/sneaksnbags' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/sneaksnbags' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates on new arrivals, exclusive deals, and fashion trends
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Button variant="default" iconName="Mail" iconPosition="left">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
            </p>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold">SneaksNBags</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Ghana's premier destination for authentic sneakers and stylish bags. 
              We bring you the latest trends with nationwide delivery and secure mobile money payments.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-accent" />
                <span className="text-sm text-gray-400">Accra, Ghana</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-accent" />
                <span className="text-sm text-gray-400">+233 24 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-accent" />
                <span className="text-sm text-gray-400">hello@sneaksnbags.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections)?.map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-white mb-4">{section?.title}</h4>
              <ul className="space-y-2">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <Link
                      to={link?.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods & Social Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-center lg:text-left">
                Accepted Payment Methods
              </h4>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
                {paymentMethods?.map((method) => (
                  <div
                    key={method?.name}
                    className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg"
                    title={method?.name}
                  >
                    <Icon name={method?.icon} size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{method?.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-center lg:text-right">
                Follow Us
              </h4>
              <div className="flex justify-center lg:justify-end space-x-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-200"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} SneaksNBags. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
          
          {/* Ghana Specific Footer Note */}
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Proudly serving customers across Ghana 🇬🇭 | Free delivery nationwide on orders over GH₵ 200
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;