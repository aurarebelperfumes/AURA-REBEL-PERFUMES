import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Eye, Plus, ShoppingBag, X, Check, EyeOff, Award, Sparkles, MessageSquare } from 'lucide-react';
import { Perfume, CartItem, Review } from '../types';
import { PERFUMES, REVIEWS } from '../data/perfumes';

interface ShopSectionProps {
  onAddToCart: (perfume: Perfume, size: number, price: number) => void;
  selectedProduct: Perfume | null;
  setSelectedProduct: (perfume: Perfume | null) => void;
}

export default function ShopSection({ onAddToCart, selectedProduct, setSelectedProduct }: ShopSectionProps) {
  // Filters & State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating
  const [minPrice, setMinPrice] = useState(60);
  const [maxPrice, setMaxPrice] = useState(160);

  // Review System LocalState
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  // Product Selection Size
  const [selectedSize, setSelectedSize] = useState<number>(50); // 50 or 100ml

  // Fetch / Save Reviews
  useEffect(() => {
    const saved = localStorage.getItem('aura_rebel_reviews');
    if (saved) {
      setLocalReviews(JSON.parse(saved));
    } else {
      localStorage.setItem('aura_rebel_reviews', JSON.stringify(REVIEWS));
      setLocalReviews(REVIEWS);
    }
  }, []);

  const categories = ['All', 'Woody & Smoky', 'Electric Floral', 'Fresh & Spicy', 'Warm & Spicy Amber'];

  // Filter Perfumes
  const filteredPerfumes = PERFUMES.filter((perfume) => {
    const matchesSearch = perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          perfume.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          perfume.story.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || perfume.category === activeCategory;
    const matchesPrice = (selectedSize === 50 ? perfume.price : perfume.price100ml) >= minPrice && 
                        (selectedSize === 50 ? perfume.price : perfume.price100ml) <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort Perfumes
  const sortedPerfumes = [...filteredPerfumes].sort((a, b) => {
    const priceA = selectedSize === 50 ? a.price : a.price100ml;
    const priceB = selectedSize === 50 ? b.price : b.price100ml;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });

  const handleProductClick = (perfume: Perfume) => {
    setSelectedProduct(perfume);
    setSelectedSize(50); // default to 50ml on click
    setReviewSubmitSuccess(false);
  };

  // Add Review
  const handleAddReview = (e: React.FormEvent, perfumeId: string) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newReview: Review = {
      id: `rev-local-${Date.now()}`,
      perfumeId,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
    };

    const updated = [newReview, ...localReviews];
    setLocalReviews(updated);
    localStorage.setItem('aura_rebel_reviews', JSON.stringify(updated));

    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewSubmitSuccess(true);
  };

  const getProductReviews = (perfumeId: string) => {
    return localReviews.filter(r => r.perfumeId === perfumeId);
  };

  const handleAddToCartAndCloseModal = (perfume: Perfume) => {
    const price = selectedSize === 50 ? perfume.price : perfume.price100ml;
    onAddToCart(perfume, selectedSize, price);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-[90vh] py-16" id="shop-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-[0.3em] font-bold">Small-Batch Formulas</span>
          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-100 mt-2">The Perfume Shop</h2>
          <p className="font-sans text-xs text-stone-400 mt-2 leading-relaxed font-light">
            Each composition represents a distinctive olfactory rebel. Filter by fragrance houses or intensity profiles to find your custom layer.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-stone-900/40 border border-stone-900 p-6 rounded-2xl mb-10 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Scent House Selector */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-sans text-[11px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-stone-950 font-black'
                      : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price sort option & size selector */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              
              {/* Size Selector in Toolbar */}
              <div className="flex items-center space-x-2 bg-stone-950 border border-stone-850 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedSize(50)}
                  className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                    selectedSize === 50 ? 'bg-stone-900 text-amber-400 font-bold border border-stone-800' : 'text-stone-400'
                  }`}
                >
                  50ml
                </button>
                <button
                  onClick={() => setSelectedSize(100)}
                  className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                    selectedSize === 100 ? 'bg-stone-900 text-amber-400 font-bold border border-stone-800' : 'text-stone-400'
                  }`}
                >
                  100ml
                </button>
              </div>

              {/* Sorting Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-44 bg-stone-950 border border-stone-850 text-stone-300 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer font-sans"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Reviews & Rating</option>
                </select>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-900">
            {/* Search Input */}
            <div className="relative col-span-2">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
              <input
                type="text"
                placeholder="Search scent notes, ingredients, or names (e.g. leather, bergamot)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-950 border border-stone-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-255 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans placeholder-stone-550"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-200 focus:none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Price slider */}
            <div className="flex flex-col justify-center space-y-1 bg-stone-950/50 px-4 py-1.5 border border-stone-850 rounded-xl">
              <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                <span>Price cap</span>
                <span className="font-bold text-amber-500">${maxPrice} USD</span>
              </div>
              <input
                type="range"
                min="70"
                max="160"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Perfume List Grid */}
        {sortedPerfumes.length === 0 ? (
          <div className="text-center py-24 bg-stone-900/20 border border-stone-900 rounded-2xl">
            <EyeOff className="w-10 h-10 text-stone-600 mx-auto mb-4" />
            <p className="font-sans text-stone-400 text-xs">No rebellious fragrances match your exact specifications.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); setMaxPrice(160); }}
              className="mt-4 text-xs font-bold text-amber-400 underline uppercase tracking-widest hover:text-amber-350 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedPerfumes.map((perfume) => {
              const price = selectedSize === 50 ? perfume.price : perfume.price100ml;
              return (
                <div 
                  key={perfume.id}
                  className="group bg-stone-900/30 hover:bg-stone-900/60 border border-stone-900 hover:border-stone-800 rounded-3xl overflow-hidden flex flex-col justify-between h-full transition-all hover:scale-[1.011]"
                  id={`perfume-card-${perfume.id}`}
                >
                  <div className="relative aspect-square overflow-hidden bg-stone-950">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                      <span className="bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-widest text-amber-400 border border-stone-850">
                        {perfume.category}
                      </span>
                      <span className="bg-stone-900/90 w-max backdrop-blur-md px-2 py-0.5 rounded-md text-[8px] font-mono tracking-widest text-stone-200 font-extralight border border-stone-850">
                        {perfume.bestFor}
                      </span>
                    </div>
                    {/* Hover Inspect Trigger */}
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleProductClick(perfume)}
                        className="bg-stone-100 hover:bg-amber-450 text-stone-950 flex items-center space-x-2 px-5 py-3 rounded-xl font-sans text-[11px] font-bold tracking-widest uppercase shadow-lg transition-transform scale-95 group-hover:scale-100 duration-300 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect Chemistry</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans text-sm font-bold text-stone-100 uppercase tracking-wide">
                          {perfume.name}
                        </h3>
                        <div className="flex items-center text-amber-400 space-x-1 font-sans text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{perfume.rating}</span>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mt-2 line-clamp-3">
                        {perfume.description}
                      </p>

                      {/* Display Top notes preview */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {perfume.topNotes.slice(0, 3).map((note) => (
                          <span key={note} className="bg-stone-950 border border-stone-900 px-2 py-0.5 rounded text-[9px] font-mono text-stone-400">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-stone-900/80 pt-4 mt-5 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-stone-500 uppercase">Volume: {selectedSize}ml</span>
                        <span className="font-sans text-sm font-black text-stone-100 tracking-wide">${price} USD</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleProductClick(perfume)}
                          className="p-2.5 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-950 text-stone-300 hover:text-stone-100 cursor-pointer"
                          title="Inspect Notes"
                        >
                          <Eye className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(perfume, selectedSize, price)}
                          className="bg-stone-50 hover:bg-amber-400 text-stone-950 p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center hover:scale-105"
                          id={`add-to-cart-quick-${perfume.id}`}
                          title="Quick Add to Cart"
                        >
                          <Plus className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Perfume Alchemy details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-10 p-2 bg-stone-950/50 hover:bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-100 rounded-full focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  
                  {/* Photo & Sizing */}
                  <div className="space-y-6">
                    <div className="aspect-square bg-stone-950 rounded-2xl overflow-hidden border border-stone-850">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Sizing Toggle inside modal */}
                    <div className="bg-stone-950/60 border border-stone-850 px-5 py-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="block font-mono text-[9px] text-stone-500 uppercase">Select Volume</span>
                        <div className="flex space-x-2 mt-1.5">
                          {selectedProduct.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setSelectedSize(sz)}
                              className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all border cursor-pointer ${
                                selectedSize === sz
                                  ? 'bg-amber-500 text-stone-950 font-black border-amber-500'
                                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-750'
                              }`}
                            >
                              {sz}ml
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block font-mono text-[9px] text-stone-500 uppercase">Est. Cost</span>
                        <p className="font-sans text-xl font-bold text-stone-50 tracking-tight mt-1.5">
                          ${selectedSize === 50 ? selectedProduct.price : selectedProduct.price100ml} USD
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCartAndCloseModal(selectedProduct)}
                      className="w-full bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-350 hover:to-rose-450 text-stone-950 py-4 rounded-xl font-sans text-xs font-extrabold uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to rebellion Cart</span>
                    </button>
                  </div>

                  {/* Scent structure & gauges */}
                  <div className="space-y-6">
                    <div>
                      <span className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md text-[9px] font-mono uppercase text-amber-400">
                        {selectedProduct.category}
                      </span>
                      <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-50 uppercase tracking-tight mt-2.5">
                        {selectedProduct.name}
                      </h3>
                      <p className="font-sans text-xs text-stone-400 italic mt-0.5 font-light leading-relaxed">
                        Best profile for: {selectedProduct.bestFor}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-sans text-[11px] font-bold tracking-widest text-stone-200 uppercase mb-2">The Olfactory Narrative</h4>
                      <p className="font-sans text-xs leading-relaxed text-stone-400 font-light">
                        {selectedProduct.story}
                      </p>
                    </div>

                    {/* Scent notes breakdown */}
                    <div className="bg-stone-950/50 border border-stone-850 p-4 rounded-2xl space-y-3.5">
                      <h4 className="font-sans text-[11px] font-bold tracking-widest text-stone-200 uppercase">Note Pyramids</h4>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="font-mono text-[9px] text-amber-400 uppercase font-bold tracking-wider">Top notes (initial spray)</span>
                          <p className="font-sans text-xs text-stone-300 mt-0.5">{selectedProduct.topNotes.join(', ')}</p>
                        </div>
                        <div className="border-t border-stone-900/50 pt-2">
                          <span className="font-mono text-[9px] text-rose-400 uppercase font-bold tracking-wider">Heart notes (remains for 4 hours)</span>
                          <p className="font-sans text-xs text-stone-300 mt-0.5">{selectedProduct.middleNotes.join(', ')}</p>
                        </div>
                        <div className="border-t border-stone-900/50 pt-2">
                          <span className="font-mono text-[9px] text-stone-400 uppercase font-bold tracking-wider">Base notes (lingers on fabric for days)</span>
                          <p className="font-sans text-xs text-stone-300 mt-0.5">{selectedProduct.baseNotes.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Performance metrics indicators */}
                    <div className="space-y-3">
                      <h4 className="font-sans text-[11px] font-bold tracking-widest text-stone-200 uppercase">Aura Metrics</h4>
                      
                      {/* Longevity indicator */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-stone-400">
                          <span>Longevity (Hours & Intensity)</span>
                          <span className="text-amber-400 font-bold">{selectedProduct.longevity === 5 ? '12h+' : '8h+'}</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full"
                            style={{ width: `${selectedProduct.longevity * 20}%` }}
                          />
                        </div>
                      </div>

                      {/* Projection indicator */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-stone-400">
                          <span>Sillage Projection (Aura Bubble)</span>
                          <span className="text-amber-400 font-bold">{selectedProduct.projection === 5 ? 'Nuclear' : 'Intimate'}</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full"
                            style={{ width: `${selectedProduct.projection * 20}%` }}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Reviews List & Submission section inside modal */}
                <div className="border-t border-stone-850 pt-10 mt-10 space-y-8">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-amber-500" />
                    <h4 className="font-sans text-lg font-bold tracking-wider text-stone-100 uppercase">
                      Rebel Testimonials ({getProductReviews(selectedProduct.id).length})
                    </h4>
                  </div>

                  {/* Comments Log */}
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-3">
                    {getProductReviews(selectedProduct.id).map((rev) => (
                      <div key={rev.id} className="bg-stone-950/40 p-4 border border-stone-850 rounded-2xl space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-xs font-bold text-stone-200">{rev.author}</span>
                          <span className="font-mono text-[9px] text-stone-500">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-450 text-amber-450" />
                          ))}
                        </div>
                        <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="bg-stone-950/80 border border-stone-850/80 p-5 rounded-2xl space-y-4">
                    <h5 className="font-sans text-xs font-bold tracking-widest text-stone-100 uppercase">Witness the Formulation? Share feedback</h5>
                    
                    {reviewSubmitSuccess ? (
                      <div className="p-3.5 bg-emerald-900/20 border border-emerald-800/30 text-emerald-400 rounded-xl text-xs flex items-center space-x-2">
                        <Check className="w-4 h-4 flex-shrink-0" />
                        <span>Receipt confirmed. Your testimonial was indexed in local storage.</span>
                      </div>
                    ) : (
                      <form onSubmit={(e) => handleAddReview(e, selectedProduct.id)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block font-mono text-[9px] text-stone-500 uppercase">Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Alexis Wild"
                              value={newReviewAuthor}
                              onChange={(e) => setNewReviewAuthor(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block font-mono text-[9px] text-stone-500 uppercase">Rating Scent</label>
                            <select
                              value={newReviewRating}
                              onChange={(e) => setNewReviewRating(Number(e.target.value))}
                              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none cursor-pointer"
                            >
                              <option value="5">⭐⭐⭐⭐⭐ Outstanding (5/5)</option>
                              <option value="4">⭐⭐⭐⭐ Bold (4/5)</option>
                              <option value="3">⭐⭐⭐ Neutral (3/5)</option>
                              <option value="2">⭐⭐ Weak (2/5)</option>
                              <option value="1">⭐ Poor (1/5)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-[9px] text-stone-500 uppercase">Detailed commentary</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Describe how the notes linger on your skin, the projection length..."
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-stone-100 hover:bg-amber-400 text-stone-950 px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Submit Testimonial
                        </button>
                      </form>
                    )}
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
