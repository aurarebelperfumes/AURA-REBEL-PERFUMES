import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Flame, Instagram } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, cart, setIsCartOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'collection', label: 'Collection' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 text-stone-100 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="p-1.5 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-lg text-stone-950 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-sans text-xl font-bold tracking-[0.25em] text-stone-50 uppercase">
                AURA REBEL
              </span>
              <span className="font-mono text-[9px] tracking-[0.4em] text-stone-400 uppercase mt-0.5">
                P e r f u m e s
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs tracking-widest uppercase transition-colors py-2 focus:outline-none cursor-pointer ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-stone-300 hover:text-stone-100'
                  }`}
                  id={`nav-tab-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right utility items */}
          <div className="flex items-center space-x-4">
            
            {/* Instagram Social Handle Shortcut */}
            <a 
              href="https://www.instagram.com/aurarebel_perfumes"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-stone-400 hover:text-rose-400 font-mono text-[11px] tracking-wider transition-colors border border-stone-800 hover:border-rose-900/50 bg-stone-900/50 px-3 py-1.5 rounded-full"
              id="instagram-shortcut-lnk"
              title="Follow @aurarebel_perfumes on Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
              <span>@aurarebel_perfumes</span>
            </a>

            {/* Shopping Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-stone-100 border border-stone-800 transition-all focus:outline-none"
              id="cart-toggle-btn"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-900 bg-stone-950/98 px-4 pt-4 pb-6 space-y-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-3 px-4 rounded-xl font-sans text-xs tracking-wider uppercase transition-all ${
                  isActive 
                    ? 'bg-amber-500/10 text-amber-400 font-bold border-l-4 border-amber-500' 
                    : 'text-stone-300 hover:bg-stone-900 hover:text-stone-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-stone-900 pb-2">
            <a 
              href="https://www.instagram.com/aurarebel_perfumes"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-stone-300 hover:text-rose-400 font-mono text-xs p-3 rounded-lg bg-stone-900/50"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram: @aurarebel_perfumes</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
