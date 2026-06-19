import React, { useState } from 'react';
import { Flame, Instagram, Mail, MapPin, Phone, Github, Sparkles, CheckCircle, Award, Droplet, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const footerLinksCompByTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-200 border-t border-stone-900 pt-16 pb-8" id="perfume-global-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value badges strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-stone-900 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3.5">
            <div className="p-2.5 rounded-xl bg-stone-900 text-amber-500 border border-stone-800">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold tracking-wider uppercase text-stone-100">Artisanal Scent Extract</p>
              <p className="font-sans text-[11px] text-stone-400 mt-0.5">High concentration formulation for 12h+ projection</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3.5">
            <div className="p-2.5 rounded-xl bg-stone-900 text-rose-400 border border-stone-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold tracking-wider uppercase text-stone-100">Cruelty-Free & Vegan</p>
              <p className="font-sans text-[11px] text-stone-400 mt-0.5">Zero animal testing or derivative compounds</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3.5">
            <div className="p-2.5 rounded-xl bg-stone-900 text-emerald-400 border border-stone-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold tracking-wider uppercase text-stone-100">Pure Organic Oils</p>
              <p className="font-sans text-[11px] text-stone-400 mt-0.5">Ethically wildcrafted flowers and smoky resins</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3.5">
            <div className="p-2.5 rounded-xl bg-stone-900 text-blue-400 border border-stone-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold tracking-wider uppercase text-stone-100">Rebel Custom Blends</p>
              <p className="font-sans text-[11px] text-stone-400 mt-0.5">Each batch individually crafted and numbered</p>
            </div>
          </div>
        </div>

        {/* Column structures */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12">
          
          {/* Logo & Manifesto */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-lg text-stone-950">
                <Flame className="w-4 h-4" />
              </div>
              <span className="font-sans text-lg font-bold tracking-[0.2em] text-stone-50 uppercase">
                AURA REBEL
              </span>
            </div>
            <p className="font-sans text-xs leading-relaxed text-stone-400 max-w-sm">
              We dismantle high-street luxury and rewrite perfume chemistry. No delicate whispers, no synthetic clouds. Pure, unapologetic raw extract to match your untethered spirit. Scent the rebellion.
            </p>
            <div className="flex items-center space-x-3">
              <a 
                href="https://www.instagram.com/aurarebel_perfumes" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-rose-400 transition-colors"
                title="Follow Instagram @aurarebel_perfumes"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="font-mono text-[11px] text-stone-400">@aurarebel_perfumes</span>
            </div>
          </div>

          {/* Quick links & Contact information */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest text-stone-100 uppercase">Explore</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => footerLinksCompByTab('home')} className="text-xs text-stone-400 hover:text-amber-400 transition-colors focus:none">
                  Scent Revolution (Home)
                </button>
              </li>
              <li>
                <button onClick={() => footerLinksCompByTab('shop')} className="text-xs text-stone-400 hover:text-amber-400 transition-colors focus:none">
                  Shop Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => footerLinksCompByTab('collection')} className="text-xs text-stone-400 hover:text-amber-400 transition-colors focus:none">
                  Curated Collections
                </button>
              </li>
              <li>
                <button onClick={() => footerLinksCompByTab('about')} className="text-xs text-stone-400 hover:text-amber-400 transition-colors focus:none">
                  Artisanal Story & About Us
                </button>
              </li>
              <li>
                <button onClick={() => footerLinksCompByTab('contact')} className="text-xs text-stone-400 hover:text-amber-400 transition-colors focus:none">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Inner Circle */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest text-stone-100 uppercase flex items-center space-x-1">
              <span>Join The Inner Circle</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </h4>
            <p className="font-sans text-xs text-stone-400 leading-relaxed">
              Unlock secret perfume releases, private batch sales of new flavors, and 10% off your initial order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center space-x-2 text-amber-400 animate-fade-in">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="font-sans text-xs font-medium">You’re on the blacklist. Check inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-900 border border-stone-800 text-stone-100 px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-stone-500 flex-grow"
                />
                <button
                  type="submit"
                  className="bg-stone-100 hover:bg-amber-400 text-stone-950 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright declaration */}
        <div className="pt-8 mt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-center space-y-4 md:space-y-0 text-stone-500 font-sans text-[11px]">
          <div>
            <p>© {new Date().getFullYear()} AURA REBEL PERFUMES. Scent Formulation No. 7041.</p>
            <p className="mt-1 text-stone-600">Sourced & curated ethically. Formulated globally on Cloud Run.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/aurarebel_perfumes" target="_blank" rel="noreferrer" className="hover:text-stone-300 transition-colors">
              Instagram Page (@aurarebel_perfumes)
            </a>
            <span className="text-stone-800">|</span>
            <span className="hover:text-stone-300">Privacy Scent-Policy</span>
            <span className="text-stone-800">|</span>
            <span className="hover:text-stone-300">Terms of Rebellion</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
