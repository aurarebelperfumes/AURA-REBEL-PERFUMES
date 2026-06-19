import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, Check, Sparkles, CreditCard, ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }: CartDrawerProps) {
  // Discount Coupon state
  const [coupon, setCoupon] = useState('');
  const [discountType, setDiscountType] = useState<'AURA20' | 'REBEL10' | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Checkout states
  const [isCheckoutFlow, setIsCheckoutFlow] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '4111 2222 3333 4444',
  });
  const [isPurchased, setIsPurchased] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Apply coupon
  let discountAmount = 0;
  if (discountType === 'AURA20') {
    discountAmount = subtotal * 0.20; // 20% off
  } else if (discountType === 'REBEL10') {
    discountAmount = subtotal * 0.10; // 10% off
  }

  const shippingCost = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const taxes = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const total = Math.round(subtotal - discountAmount + shippingCost + taxes);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCoupon = coupon.trim().toUpperCase();
    if (cleanCoupon === 'AURA20') {
      setDiscountType('AURA20');
      setCouponSuccess('20% Blacklist Discount applied!');
      setCouponError('');
    } else if (cleanCoupon === 'REBEL10') {
      setDiscountType('REBEL10');
      setCouponSuccess('10% Instagram Community discount applied!');
      setCouponError('');
    } else {
      setCouponError('Invalid secret discount code.');
      setCouponSuccess('');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName.trim() || !shippingAddress.email.trim() || !shippingAddress.address.trim()) return;

    // Trigger purchase success
    setReceiptNumber('AURA-' + Math.floor(100000 + Math.random() * 900000));
    setIsPurchased(true);
  };

  const resetCheckout = () => {
    onClearCart();
    setIsCheckoutFlow(false);
    setIsPurchased(false);
    setCoupon('');
    setDiscountType(null);
    setCouponSuccess('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs transition-opacity" 
        onClick={() => { if (!isCheckoutFlow) onClose(); }}
      />

      {/* Slideout Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header Panel */}
          <div className="px-6 py-5 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold tracking-widest text-stone-100 uppercase">
                {isCheckoutFlow ? 'Secure checkout' : 'Your scent bag'}
              </h3>
            </div>
            {!isPurchased && (
              <button 
                onClick={onClose} 
                className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            
            {/* 1. PURCHASE REVIEW STATE */}
            {isPurchased ? (
              <div className="text-center py-10 space-y-6 animate-fade-in flex flex-col items-center">
                <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">TRANSACTION DEPLOYED</span>
                  <h4 className="font-sans text-xl font-black text-stone-50 uppercase">Scent on its Way</h4>
                  <p className="font-sans text-xs text-stone-300 font-light max-w-sm mx-auto leading-relaxed">
                    Amazing! Our perfumers are packaging your hand-numbered extractions. A shipping log has been sent to **{shippingAddress.email}**.
                  </p>
                </div>

                {/* Receipt values */}
                <div className="bg-stone-950 border border-stone-850 p-5 rounded-2xl w-full text-left font-mono space-y-2.5 text-xs text-stone-400">
                  <div className="flex justify-between border-b border-stone-900 pb-2 mb-2 text-stone-200">
                    <span>Receipt No</span>
                    <span className="font-bold text-amber-400">{receiptNumber}</span>
                  </div>
                  <div className="space-y-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-[11px]">
                        <span>{item.name} ({item.size}ml) ×{item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-900 pt-2.5 mt-2 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-rose-450 font-bold">
                        <span>Discounted code</span>
                        <span>-${Math.round(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between text-stone-100 font-bold text-xs pt-2 border-t border-dashed border-stone-850 mt-1">
                      <span>Paid Total</span>
                      <span>${total} USD</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetCheckout}
                  className="w-full bg-stone-100 hover:bg-amber-400 text-stone-950 py-4 rounded-xl font-sans text-xs font-black uppercase tracking-widest transition-transform cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : isCheckoutFlow ? (
              
              /* 2. CHECKOUT FORM STATE */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-amber-500 font-bold">SHIPPING DETAILS</span>
                
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-stone-500 uppercase">Receiver Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Robin Rebel"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-stone-500 uppercase">E-Mail Address</label>
                  <input
                    type="email"
                    required
                    placeholder="robin@rebel.com"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-stone-500 uppercase">Full Destination Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Suite 4B, 110 Liberty Blvd."
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] text-stone-500 uppercase">City</label>
                    <input
                      type="text"
                      required
                      placeholder="London"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] text-stone-500 uppercase">ZIP Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="EC1A 1AA"
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-3">
                  <label className="block font-mono text-[9px] text-stone-500 uppercase">Payment Card (Mock)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-stone-500" />
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={shippingAddress.cardNumber}
                      onChange={(e) => setShippingAddress({...shippingAddress, cardNumber: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-805 rounded-xl pl-11 pr-4 py-3 text-xs text-stone-300 focus:outline-none font-mono"
                    />
                  </div>
                  <span className="block text-[9px] text-stone-500 italic mt-0.5">Use standard mock numbers for testing.</span>
                </div>

                {/* Back button */}
                <div className="flex gap-3 justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutFlow(false)}
                    className="font-sans text-[11px] font-bold text-stone-400 hover:text-stone-100 uppercase px-1 py-2 focus:stroke-none"
                  >
                    Back to bag
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-400 to-rose-500 text-stone-950 px-8 py-3.5 rounded-xl font-sans text-xs font-black uppercase tracking-widest cursor-pointer"
                  >
                    Procure Order
                  </button>
                </div>
              </form>
            ) : cart.length === 0 ? (
              
              /* 3. EMPTY STATE */
              <div className="text-center py-20 space-y-4 flex flex-col items-center justify-center h-full">
                <ShoppingBag className="w-12 h-12 text-stone-700 animate-pulse" />
                <div className="space-y-1">
                  <p className="font-sans text-stone-300 text-sm font-semibold">Your scent drawer is empty</p>
                  <p className="font-sans text-stone-500 text-xs font-light">Explore out signature perfume selections to add your flavor.</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-stone-100 text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              
              /* 4. ITEMS LIST STATE */
              <div className="space-y-6">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center space-x-4 bg-stone-950 border border-stone-850 p-3.5 rounded-2xl relative group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-900 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-sans text-xs font-bold text-stone-200 uppercase tracking-wide">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-500 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                            title="Remove product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="space-y-1 text-left">
                            <span className="block font-mono text-[9px] text-stone-500 uppercase">Volume: {item.size}ml</span>
                            <span className="block font-sans text-xs font-bold text-stone-100">${item.price} USD</span>
                          </div>

                          {/* Quantity selector buttons */}
                          <div className="flex items-center space-x-2.5 bg-stone-900 p-1 rounded-lg border border-stone-800">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-stone-400 hover:text-stone-100"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-sans font-bold text-[11px] text-stone-200 px-1">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-stone-400 hover:text-stone-100"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secret Promo code box */}
                <div className="bg-stone-950 border border-stone-850 rounded-2xl p-4 space-y-3">
                  <span className="block font-mono text-[9px] text-stone-500 uppercase tracking-widest font-bold">REBEL ACCREDITATION DISCOUNTS</span>
                  <p className="font-sans text-[11px] text-stone-400 font-light leading-relaxed">
                    Test codes: Try **AURA20** for 20% off, or **REBEL10** for 10% off.
                  </p>

                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. AURA20"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="bg-stone-900 border border-stone-800 text-stone-100 px-3 py-2 rounded-xl text-xs focus:outline-none uppercase font-mono tracking-widest placeholder-stone-600 flex-grow"
                    />
                    <button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-xl font-sans text-[11px] font-bold uppercase cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {couponSuccess && (
                    <div className="text-[10px] text-emerald-450 font-bold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5 mr-0.5 text-emerald-400" />
                      <span>{couponSuccess}</span>
                    </div>
                  )}
                  {couponError && (
                    <div className="text-[10px] text-rose-500 font-bold">
                      ❌ {couponError}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Receipt Summary Panel (Only if not empty or purchased) */}
          {!isPurchased && cart.length > 0 && (
            <div className="px-6 py-6 border-t border-stone-850 bg-stone-950 space-y-4">
              <div className="space-y-2 text-xs font-mono text-stone-400">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span>${subtotal}.00</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-450">
                    <span>Applied Coupon</span>
                    <span>-${Math.round(discountAmount)}.00</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Scent shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}.99`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-stone-100 font-bold text-sm pt-3 border-t border-dashed border-stone-800 mt-2">
                  <span>Estimated Total</span>
                  <span>${total}.00 USD</span>
                </div>
                
                {subtotal <= 100 && (
                  <span className="block text-[9px] text-amber-500 mt-1 font-light italic text-right animate-pulse">
                    Add ${(100 - subtotal)} more to qualify for FREE premium courier shipping.
                  </span>
                )}
              </div>

              {!isCheckoutFlow ? (
                <button
                  onClick={() => setIsCheckoutFlow(true)}
                  className="w-full bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-350 hover:to-rose-450 text-stone-950 py-3.5 rounded-xl font-sans text-xs font-black uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2 transition-transform cursor-pointer"
                >
                  <span>Proceed to secure checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
