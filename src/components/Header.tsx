
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for transparent to solid header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 shadow-md py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container-custom px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {/* Logo with Arabic-inspired decoration */}
              <div className="relative group">
                <div className="absolute -top-2 -left-3 w-6 h-6 border-t border-l border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -right-3 w-6 h-6 border-b border-r border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center">
                  <span className={cn(
                    "font-playfair text-3xl font-bold transition-colors duration-300",
                    isScrolled ? "text-navy" : "text-white"
                  )}>Miles</span>
                  <span className="font-playfair text-3xl font-bold text-gold">Market</span>
                </div>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <a href="#airlines" className={cn(
              "transition-colors duration-200 flex items-center hover:text-gold",
              isScrolled ? "text-navy" : "text-white"
            )}>
              Airlines
            </a>
            <a href="#calculator" className={cn(
              "transition-colors duration-200 flex items-center hover:text-gold",
              isScrolled ? "text-navy" : "text-white"
            )}>
              Calculator
            </a>
            <a href="#testimonials" className={cn(
              "transition-colors duration-200 flex items-center hover:text-gold",
              isScrolled ? "text-navy" : "text-white"
            )}>
              Testimonials
            </a>
            <a href="#about" className={cn(
              "transition-colors duration-200 flex items-center hover:text-gold",
              isScrolled ? "text-navy" : "text-white"
            )}>
              About
              <ChevronDown size={16} className="ml-1" />
            </a>
            <a 
              href="#quote" 
              className={cn(
                "bg-gold hover:bg-gold-dark text-white py-2.5 px-8 rounded transition-all duration-300",
                "hover:shadow-lg transform hover:translate-y-[-2px]"
              )}
            >
              Request Quote
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className={cn(
              "lg:hidden transition-colors duration-200 p-2",
              isScrolled ? "text-navy hover:text-gold" : "text-white hover:text-gold"
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="py-6 px-6 space-y-6">
            <a href="#airlines" className="block text-navy hover:text-gold transition-colors duration-200 text-lg" onClick={toggleMenu}>Airlines</a>
            <a href="#calculator" className="block text-navy hover:text-gold transition-colors duration-200 text-lg" onClick={toggleMenu}>Calculator</a>
            <a href="#testimonials" className="block text-navy hover:text-gold transition-colors duration-200 text-lg" onClick={toggleMenu}>Testimonials</a>
            <a href="#about" className="block text-navy hover:text-gold transition-colors duration-200 text-lg" onClick={toggleMenu}>About Us</a>
            <a 
              href="#quote" 
              className="block bg-gold hover:bg-gold-dark text-white py-3 px-6 rounded-md transition-colors duration-200 text-center text-lg font-medium"
              onClick={toggleMenu}
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
