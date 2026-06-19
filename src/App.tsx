import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import ShopSection from './components/ShopSection';
import CollectionSection from './components/CollectionSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import { Perfume, CartItem } from './types';

export default function App() {
  // Navigation tabs: 'home' | 'shop' | 'collection' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Selected inspect perfume product
  const [selectedProduct, setSelectedProduct] = useState<Perfume | null>(null);

  // Cart Local Storage persistence
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local store
  useEffect(() => {
    const savedCart = localStorage.getItem('aura_rebel_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save to local store
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('aura_rebel_cart', JSON.stringify(newCart));
  };

  // Add standard item to cart
  const handleAddToCart = (perfume: Perfume, size: number, price: number) => {
    const itemId = `${perfume.id}-${size}`;
    const existingIndex = cart.findIndex((item) => item.id === itemId);

    let updatedCart: CartItem[] = [];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [
        ...cart,
        {
          id: itemId,
          perfumeId: perfume.id,
          name: perfume.name,
          size,
          price,
          quantity: 1,
          image: perfume.image,
        },
      ];
    }
    saveCart(updatedCart);
    setIsCartOpen(true); // Open cart immediately to provide delightful confirmation!
  };

  // Add bundled duo-set with special discounted prices
  const handleAddBundleToCart = (perfumes: Perfume[], bundleName: string, discountedPriceSum: number) => {
    // Add both perfumes in 50ml sizes, dividing the discounted price proportionally or equally
    const dividedPrice = Math.round(discountedPriceSum / perfumes.length);
    let updatedCart = [...cart];

    perfumes.forEach((p) => {
      const itemId = `${p.id}-50`;
      const existingIndex = updatedCart.findIndex((item) => item.id === itemId);
      
      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart.push({
          id: itemId,
          perfumeId: p.id,
          name: p.name + ' (Bundle Set)',
          size: 50,
          price: dividedPrice,
          quantity: 1,
          image: p.image,
        });
      }
    });

    saveCart(updatedCart);
    setIsCartOpen(true);
  };

  // Update item volumes & counts
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const filtered = cart.filter((item) => item.id !== itemId);
      saveCart(filtered);
    } else {
      const updated = cart.map((item) => 
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCart(updated);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const filtered = cart.filter((item) => item.id !== itemId);
    saveCart(filtered);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleSelectProductAndRoute = (perfume: Perfume) => {
    setSelectedProduct(perfume);
    setActiveTab('shop');
    // Scroll smoothly to details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-stone-955 min-h-screen text-stone-105 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-900" id="aura-perfumes-viewport">
      
      {/* Brand Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cart={cart} 
        setIsCartOpen={setIsCartOpen} 
      />

      {/* Dynamic Section Routing Layout */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeSection 
            onExploreProducts={() => setActiveTab('shop')} 
            onSelectProduct={handleSelectProductAndRoute}
          />
        )}
        {activeTab === 'shop' && (
          <ShopSection 
            onAddToCart={handleAddToCart}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {activeTab === 'collection' && (
          <CollectionSection 
            onSelectProduct={handleSelectProductAndRoute}
            onAddBundleToCart={handleAddBundleToCart}
          />
        )}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Brand Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Slideout shopping cart tray drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
