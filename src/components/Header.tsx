
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white bg-opacity-95 z-50 shadow-sm">
      <div className="container-custom py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-instrument text-2xl font-bold text-red">Miles</span>
                  <span className="font-instrument text-2xl font-bold text-gold ml-1">Market</span>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-navy mt-[-4px] ml-0.5">
                  Premium Travel Miles
                </span>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#airlines" className="text-navy hover:text-gold transition-colors duration-200">Airlines</a>
            <a href="#calculator" className="text-navy hover:text-gold transition-colors duration-200">Calculator</a>
            <a href="#testimonials" className="text-navy hover:text-gold transition-colors duration-200">Testimonials</a>
            <a href="#about" className="text-navy hover:text-gold transition-colors duration-200">About Us</a>
            <Button 
              className="bg-red hover:bg-red-dark text-white"
              asChild
            >
              <a href="#quote">Get a Quote</a>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-red text-white hover:bg-red-dark transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="block bg-red hover:bg-red-dark text-white py-2 px-6 rounded-md transition-colors duration-200 text-center"
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
