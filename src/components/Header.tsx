
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white bg-opacity-95 z-50 shadow-sm">
      <div className="container-custom py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="font-playfair text-2xl font-bold text-navy">Miles</span>
              <span className="font-playfair text-2xl font-bold text-gold">Market</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#airlines" className="text-navy hover:text-gold transition-colors duration-200">Airlines</a>
            <a href="#calculator" className="text-navy hover:text-gold transition-colors duration-200">Calculator</a>
            <a href="#testimonials" className="text-navy hover:text-gold transition-colors duration-200">Testimonials</a>
            <a href="#about" className="text-navy hover:text-gold transition-colors duration-200">About Us</a>
            <a 
              href="#quote" 
              className="bg-gold hover:bg-gold-dark text-white py-2 px-6 rounded-md transition-colors duration-200"
            >
              Get a Quote
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-navy hover:text-gold transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white shadow-md transform transition-transform duration-300",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="py-4 px-6 space-y-4">
            <a href="#airlines" className="block text-navy hover:text-gold transition-colors duration-200" onClick={toggleMenu}>Airlines</a>
            <a href="#calculator" className="block text-navy hover:text-gold transition-colors duration-200" onClick={toggleMenu}>Calculator</a>
            <a href="#testimonials" className="block text-navy hover:text-gold transition-colors duration-200" onClick={toggleMenu}>Testimonials</a>
            <a href="#about" className="block text-navy hover:text-gold transition-colors duration-200" onClick={toggleMenu}>About Us</a>
            <a 
              href="#quote" 
              className="block bg-gold hover:bg-gold-dark text-white py-2 px-6 rounded-md transition-colors duration-200 text-center"
              onClick={toggleMenu}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
