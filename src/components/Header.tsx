
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white bg-opacity-95 z-50 shadow-sm">
      {/* Announcement bar */}
      <div className="bg-navy py-2 text-center text-white text-xs hidden md:block">
        <p className="font-jakarta">Premium Airline Miles Marketplace • Save Up To 70% On Luxury Flight Tickets</p>
      </div>
      
      <div className="container-custom px-6 relative md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#airlines"
              className="text-navy hover:text-gold transition-colors duration-200 font-jakarta text-sm uppercase tracking-wide font-medium"
            >
              Airlines
            </a>
            <a
              href="#calculator"
              className="text-navy hover:text-gold transition-colors duration-200 font-jakarta text-sm uppercase tracking-wide font-medium"
            >
              Calculator
            </a>
            <Link
              to="/reviews"
              className="text-navy hover:text-gold transition-colors duration-200 font-jakarta text-sm uppercase tracking-wide font-medium"
            >
              Reviews
            </Link>
          </nav>
          
          {/* Logo (Center aligned) */}
          <div className="flex flex-col items-center justify-center">
            <Link to="/" className="flex items-center p-0">
              <span className="font-jakarta text-2xl md:text-3xl font-bold tracking-tighter text-navy">
                CASH<span className="text-gold">MY</span>POINTS
              </span>
            </Link>
            <span className="hidden md:block text-[11px] text-gray-500 font-jakarta -mt-1">
              Premium Airline Miles Marketplace
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-navy hover:text-gold transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#testimonials"
              className="text-navy hover:text-gold transition-colors duration-200 font-jakarta text-sm uppercase tracking-wide font-medium"
            >
              Testimonials
            </a>
            <a
              href="#about"
              className="text-navy hover:text-gold transition-colors duration-200 font-jakarta text-sm uppercase tracking-wide font-medium"
            >
              About Us
            </a>
            <a
              href="#quote"
              className="bg-gold hover:bg-gold-dark text-white py-2 px-6 rounded-md transition-colors duration-200 font-jakarta text-sm uppercase tracking-wide font-medium"
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
                <span className="font-jakarta text-2xl font-bold tracking-tighter text-navy">
                  CASH<span className="text-gold">MY</span>POINTS
                </span>
                <span className="text-xs text-gray-500 font-jakarta">
                  Premium Airline Miles
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end w-full">
              <a
                href="#airlines"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2 font-jakarta text-sm uppercase tracking-wide"
                onClick={toggleMenu}
              >
                Airlines
              </a>
              <a
                href="#calculator"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2 font-jakarta text-sm uppercase tracking-wide"
                onClick={toggleMenu}
              >
                Calculator
              </a>
              <a
                href="#testimonials"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2 font-jakarta text-sm uppercase tracking-wide"
                onClick={toggleMenu}
              >
                Testimonials
              </a>
              <Link
                to="/reviews"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2 font-jakarta text-sm uppercase tracking-wide"
                onClick={toggleMenu}
              >
                Reviews
              </Link>
              <a
                href="#about"
                className="block text-navy hover:text-gold transition-colors duration-200 py-2 font-jakarta text-sm uppercase tracking-wide"
                onClick={toggleMenu}
              >
                About Us
              </a>
              <a
                href="#quote"
                className="w-full flex justify-center items-center bg-gold hover:bg-gold-dark text-white py-2 px-6 rounded-md transition-colors duration-200 mt-4 font-jakarta text-sm uppercase tracking-wide"
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
