
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white bg-opacity-95 z-50 shadow-sm">
      <div className="container-custom px-6 relative md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo (Left aligned) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center p-0">
              <div className="flex items-center py-3">
                <div className="flex flex-col items-start">
                  <span className="text-xl md:text-2xl font-bold text-navy font-gilda">
                    Cash <span className="text-gold">My Points</span>
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-500 -mt-1">
                    Premium Airline Miles Marketplace
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button (Right) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-navy hover:text-gold transition-colors duration-200 z-10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#airlines"
              className="text-navy hover:text-gold transition-colors duration-200"
            >
              Airlines
            </a>
            <a
              href="#calculator"
              className="text-navy hover:text-gold transition-colors duration-200"
            >
              Calculator
            </a>
            <a
              href="#testimonials"
              className="text-navy hover:text-gold transition-colors duration-200"
            >
              Testimonials
            </a>
            <Link
              to="/reviews"
              className="text-navy hover:text-gold transition-colors duration-200"
            >
              Reviews
            </Link>
            <a
              href="#about"
              className="text-navy hover:text-gold transition-colors duration-200"
            >
              About Us
            </a>
            <a
              href="#quote"
              className="bg-gold hover:bg-gold-dark text-white py-2 px-6 rounded-md transition-colors duration-200"
            >
              Get a Quote
            </a>
          </nav>
        </div>

        {/* Mobile Navigation (Sliding from Right) */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="py-6 px-6 flex flex-col space-y-4 items-end">
            {/* Close Button in Mobile Menu (Left) */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 left-4 text-navy hover:text-gold transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Mobile brand logo */}
            <div className="w-full flex justify-center mb-4 mt-6">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-navy font-gilda">
                  Cash <span className="text-gold">My Points</span>
                </span>
                <span className="text-xs text-gray-500">
                  Premium Airline Miles
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end w-full">
              <a
                href="#airlines"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2"
                onClick={toggleMenu}
              >
                Airlines
              </a>
              <a
                href="#calculator"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2"
                onClick={toggleMenu}
              >
                Calculator
              </a>
              <a
                href="#testimonials"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2"
                onClick={toggleMenu}
              >
                Testimonials
              </a>
              <Link
                to="/reviews"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2"
                onClick={toggleMenu}
              >
                Reviews
              </Link>
              <a
                href="#about"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2"
                onClick={toggleMenu}
              >
                About Us
              </a>
              <a
                href="#quote"
                className="w-full flex justify-center items-center bg-gold hover:bg-gold-dark text-white py-2 px-6 rounded-md transition-colors duration-200 mt-4"
                onClick={toggleMenu}
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
