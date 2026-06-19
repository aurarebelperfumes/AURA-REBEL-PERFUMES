import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle, Flame, Gift, ShoppingBag } from 'lucide-react';
import { Collection, Perfume } from '../types';
import { COLLECTIONS, PERFUMES } from '../data/perfumes';

interface CollectionSectionProps {
  onSelectProduct: (perfume: Perfume) => void;
  onAddBundleToCart: (perfumes: Perfume[], bundleName: string, discount: number) => void;
}

export default function CollectionSection({ onSelectProduct, onAddBundleToCart }: CollectionSectionProps) {
  const [selectedColId, setSelectedColId] = useState<string>('outlaw-duo');
  const [addedBundleSuccess, setAddedBundleSuccess] = useState<string | null>(null);

  const activeCollection = COLLECTIONS.find(c => c.id === selectedColId) || COLLECTIONS[0];

  // Helper to fetch actual perfume objects belonging to collection
  const collectionPerfumes = PERFUMES.filter(p => activeCollection.perfumeIds.includes(p.id));

  // Pricing calculations
  const originalPriceSum = collectionPerfumes.reduce((acc, p) => acc + p.price, 0); // 50ml bundle price sum
  const bundleDiscount = 0.15; // 15% bundle discount
  const bundleDiscountedPrice = Math.round(originalPriceSum * (1 - bundleDiscount));

  const handleAddBundle = (col: Collection) => {
    onAddBundleToCart(collectionPerfumes, col.name, bundleDiscountedPrice);
    setAddedBundleSuccess(col.id);
    setTimeout(() => {
      setAddedBundleSuccess(null);
    }, 4000);
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-[90vh] py-16" id="collection-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-[0.3em] font-bold">Curated Duos</span>
          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-100 mt-2">The Collections</h2>
          <p className="font-sans text-xs text-stone-400 mt-2 leading-relaxed font-light">
            We pair opposite perfume moods into custom-sealed presentation boxes. Purchase as a bundled duo to experience complete olfactory versatility.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {COLLECTIONS.map((col) => {
            const isActive = col.id === selectedColId;
            return (
              <button
                key={col.id}
                onClick={() => setSelectedColId(col.id)}
                className={`px-6 py-3 rounded-2xl font-sans text-xs font-bold tracking-widest uppercase transition-all flex items-center space-x-2 border cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 border-amber-600 text-amber-400 shadow-xl'
                    : 'bg-stone-950 border-stone-850 text-stone-400 hover:text-stone-300'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${isActive ? 'text-amber-500 animate-pulse' : 'text-stone-500'}`} />
                <span>{col.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Collection Display Panel */}
        <div className="bg-stone-900/40 border border-stone-900 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle colored spot based on collection accent */}
          <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-gradient-to-tr opacity-10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: narrative */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-amber-400">
                <Gift className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-wider">COMBO DECIPIENCY DEAL: 15% DECAYED PRICE</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-50">
                  {activeCollection.name}
                </h3>
                <p className="font-sans text-sm text-stone-300 italic font-medium leading-relaxed">
                  "{activeCollection.tagline}"
                </p>
                <p className="font-sans text-xs text-stone-400 font-light leading-relaxed pt-2.5">
                  {activeCollection.description}
                </p>
              </div>

              {/* pricing box */}
              <div className="p-5 bg-stone-950 border border-stone-850 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[9px] text-stone-500 uppercase">Valued Separately</span>
                  <p className="line-through text-stone-500 text-sm font-bold mt-1">${originalPriceSum}.00 USD</p>
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-emerald-400 uppercase font-bold tracking-wider">Bundle price (50ml × 2)</span>
                  <p className="text-stone-100 text-2xl font-black mt-1">${bundleDiscountedPrice}.00 USD</p>
                </div>
              </div>

              {/* CTA button */}
              {addedBundleSuccess === activeCollection.id ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  <span>Duo-set added to cart!</span>
                </div>
              ) : (
                <button
                  onClick={() => handleAddBundle(activeCollection)}
                  className="w-full bg-stone-100 hover:bg-amber-400 text-stone-950 py-4.5 rounded-xl font-sans text-xs font-black uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire the {activeCollection.name} Set</span>
                </button>
              )}

            </div>

            {/* Right side: Perfumes listed inside collection */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {collectionPerfumes.map((perfume) => (
                  <div 
                    key={perfume.id}
                    className="bg-stone-950 border border-stone-850 rounded-2xl p-5 hover:border-stone-800 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square rounded-xl overflow-hidden bg-stone-900 mb-4 border border-stone-900">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <span className="bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[8px] font-mono uppercase text-amber-400">
                        {perfume.category}
                      </span>
                      <h4 className="font-sans text-sm font-bold text-stone-100 uppercase tracking-wide mt-2">
                        {perfume.name}
                      </h4>
                      <p className="font-sans text-[11px] text-stone-400 font-light leading-relaxed mt-2 line-clamp-3">
                        {perfume.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectProduct(perfume)}
                      className="mt-4 flex items-center space-x-1.5 text-[10px] font-mono uppercase font-bold tracking-widest text-amber-500 hover:text-amber-400 focus:outline-none"
                    >
                      <span>Examine Note Pyramids</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Scent Layering Tutorial */}
        <section className="py-16 mt-20 bg-stone-900/20 border border-stone-900 rounded-3xl p-6 sm:p-10">
          <div className="max-w-2xl">
            <h3 className="font-sans text-xl font-bold uppercase tracking-wider text-amber-400 mb-3">
              The Rebel Scent-Layering Philosophy
            </h3>
            <p className="font-sans text-xs text-stone-300 leading-relaxed font-light mb-6">
              Our extracts are chemically balanced to allow scent-layering. Do not stick to one boring bottle. Spray **Citrus Outlaw** as an base skin layer to energize, then spray **Midnight Rebel** on your pulse points (neck & wrist) to anchor it in smoky leather. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-stone-950 border border-stone-850 rounded-xl">
                <span className="font-mono text-xs text-amber-500 font-bold">01. Bottom Layer</span>
                <p className="font-sans text-[11px] text-stone-400 mt-1 font-light">Fresh/Citrus scents go on clean skin first to hydrate and provide a sparkling aura matrix.</p>
              </div>
              <div className="p-4 bg-stone-950 border border-stone-850 rounded-xl">
                <span className="font-mono text-xs text-rose-400 font-bold">02. Anchor Layer</span>
                <p className="font-sans text-[11px] text-stone-400 mt-1 font-light">Spray heavier oud/leather bases on pulse points to lock in sillage and slow evaporation.</p>
              </div>
              <div className="p-4 bg-stone-950 border border-stone-850 rounded-xl">
                <span className="font-mono text-xs text-purple-400 font-bold">03. Warm Up</span>
                <p className="font-sans text-[11px] text-stone-400 mt-1 font-light">Let the layers fuse naturally on your warm skin without rubbing, which crushes perfume molecules.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
