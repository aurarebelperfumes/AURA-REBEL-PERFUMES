import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame, Heart, RefreshCw, Compass, Shield, Smile, Eye } from 'lucide-react';
import { Perfume } from '../types';
import { PERFUMES } from '../data/perfumes';

interface HomeSectionProps {
  onExploreProducts: () => void;
  onSelectProduct: (perfume: Perfume) => void;
}

export default function HomeSection({ onExploreProducts, onSelectProduct }: HomeSectionProps) {
  // Scent Finder Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0 = Start, 1 = Style, 2 = Env, 3 = Result
  const [answers, setAnswers] = useState({
    style: '',
    env: '',
  });
  const [recommendedPerfume, setRecommendedPerfume] = useState<Perfume | null>(null);

  // Instagram Mock Feed (since user explicitly called out aurarebel_perfumes)
  const instagramMockPosts = [
    {
      id: 1,
      tag: '#DarkLeather',
      likes: '1,240',
      comments: '46',
      image: '/src/assets/images/midnight_rebel_1781902639862.jpg',
      caption: 'The night is your playground. Bottle raw, unrestrained suede with #MidnightRebel.'
    },
    {
      id: 2,
      tag: '#NeonVibes',
      likes: '984',
      comments: '32',
      image: '/src/assets/images/neon_flora_1781902655412.jpg',
      caption: 'Shatter convention. Electric jasmine sparks paired with sweet liquid amber. #NeonFlora'
    },
    {
      id: 3,
      tag: '#FreshRebellion',
      likes: '1,560',
      comments: '88',
      image: '/src/assets/images/citrus_outlaw_1781902669319.jpg',
      caption: 'Smoky, charred orange rind for cold confidence. Dare to defy expectation. #CitrusOutlaw'
    },
    {
      id: 4,
      tag: '#ForbiddenAmber',
      likes: '2,110',
      comments: '104',
      image: '/src/assets/images/voodoo_desire_1781902704385.jpg',
      caption: 'Light the flame. An intoxicating capture of pure Madagascan vanilla pods and smoking resins.'
    },
  ];

  const startQuiz = () => {
    setQuizStep(1);
    setRecommendedPerfume(null);
  };

  const selectStyle = (style: string) => {
    setAnswers(prev => ({ ...prev, style }));
    setQuizStep(2);
  };

  const selectEnv = (env: string) => {
    const finalAnswers = { ...answers, env };
    setAnswers(finalAnswers);
    
    // Simple logic to recommend a perfume
    let recommended: Perfume;
    if (finalAnswers.style === 'bold' && env === 'night') {
      recommended = PERFUMES.find(p => p.id === 'midnight-rebel') || PERFUMES[0];
    } else if (finalAnswers.style === 'vibrant' && env === 'anytime') {
      recommended = PERFUMES.find(p => p.id === 'neon-flora') || PERFUMES[1];
    } else if (finalAnswers.style === 'casual' && env === 'day') {
      recommended = PERFUMES.find(p => p.id === 'citrus-outlaw') || PERFUMES[2];
    } else {
      recommended = PERFUMES.find(p => p.id === 'voodoo-desire') || PERFUMES[3];
    }

    setRecommendedPerfume(recommended);
    setQuizStep(3);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers({ style: '', env: '' });
    setRecommendedPerfume(null);
  };

  return (
    <div className="bg-stone-950 text-stone-100" id="home-section-container">
      
      {/* High-fashion dramatic hero banner */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center" id="hero-banner-showcase">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/hero_perfume_banner_1781902624352.jpg" 
            alt="Aura Rebel Luxury Perfume" 
            className="w-full h-full object-cover opacity-60 scale-102 filter brightness-[0.7] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-transparent to-stone-950/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 z-10">
          <div className="max-w-2xl space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase font-semibold tracking-[0.2em]">Scent The Rebellion</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-stone-50 uppercase">
              WEAR YOUR AURA.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-rose-600">
                RULES ARE FOR OTHERS.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg font-light">
              We disassemble fine boutique perfumery, stripping away traditional constraints. Pure organic oils, extreme concentrations, and raw aesthetic compounds. Ignite your identity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-stone-950 font-sans text-xs font-black uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-rose-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                id="hero-explore-btn"
              >
                <span>Browse Signature Flavors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('scent-finder-quiz-block');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center space-x-2 border border-stone-700 hover:border-amber-400 text-stone-200 hover:text-stone-50 bg-stone-900/50 hover:bg-stone-900/80 px-6 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                id="hero-quiz-scroll-btn"
              >
                <span>Take Scent Finder Quiz</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Signature fragrances section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="font-mono text-xs text-amber-500 uppercase tracking-[0.35em] font-bold">Uncompromising Formulation</h2>
            <p className="font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-100 mt-2">Signature Releases</p>
          </div>
          <p className="font-sans text-xs text-stone-400 max-w-md mt-4 md:mt-0 leading-relaxed font-light">
            Each bottle is blended by hand in microtomes, aged under volcanic soil parameters to mature the amber resins, resulting in 16+ hour projections.
          </p>
        </div>

        {/* 4 fragrance grid preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PERFUMES.map((perfume) => (
            <div 
              key={perfume.id} 
              onClick={() => onSelectProduct(perfume)}
              className="group bg-stone-900/50 border border-stone-900 hover:border-stone-800 rounded-2xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-4px] flex flex-col h-full"
            >
              <div className="relative aspect-square overflow-hidden bg-stone-950">
                <img 
                  src={perfume.image} 
                  alt={perfume.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-stone-850 px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-widest text-amber-400">
                  {perfume.category}
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-sm font-bold text-stone-100 tracking-wide uppercase group-hover:text-amber-400 transition-colors">
                    {perfume.name}
                  </h3>
                  <p className="font-sans text-xs text-stone-400 font-light mt-1.5 leading-relaxed line-clamp-2">
                    {perfume.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-stone-850 pt-4 mt-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-stone-500 uppercase">From</span>
                    <span className="font-sans text-sm font-bold text-stone-100">${perfume.price} USD</span>
                  </div>
                  <div className="inline-flex items-center text-[10px] font-sans font-bold tracking-widest uppercase text-amber-400 group-hover:translate-x-1.5 transition-transform">
                    <span>Explore notes</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rebel Scent Finder Quiz Module */}
      <section className="py-24 bg-stone-900/40 border-b border-stone-900" id="scent-finder-quiz-block">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-mono text-xs text-amber-500 uppercase tracking-[0.35em] font-bold">Unsure of your aura?</h2>
            <p className="font-sans text-3xl font-extrabold uppercase tracking-tight text-white mt-2">REBEL SCENT FINDER</p>
            <p className="font-sans text-xs text-stone-400 mt-2 font-light leading-relaxed">
              Answer two dynamic queries to identify the exact fragrance layer suited to your rebellious temperament.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-850 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[350px] flex flex-col justify-between">
            
            {/* Background glowing elements */}
            <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Quiz Screen Control */}
            {quizStep === 0 && (
              <div className="text-center my-auto py-6 space-y-6 flex flex-col items-center">
                <div className="p-4 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 text-amber-400 border border-amber-500/30">
                  <Compass className="w-8 h-8 animate-spin-slow" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="font-sans text-xl font-bold uppercase tracking-wider text-stone-100">Unlock your Olfactory Blueprint</h3>
                  <p className="font-sans text-xs text-stone-400 max-w-sm leading-relaxed font-light">
                    We match your daily habits, preferred setting, and style preferences to our small-batch extracts.
                  </p>
                </div>
                <button
                  onClick={startQuiz}
                  className="bg-stone-100 hover:bg-amber-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer transition-all"
                >
                  Initiate Diagnosis
                </button>
              </div>
            )}

            {/* Step 1: Choose style */}
            {quizStep === 1 && (
              <div className="space-y-6 my-auto">
                <div>
                  <span className="font-mono text-[10px] uppercase text-amber-500 font-bold">Query 01 of 02</span>
                  <h3 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-wide text-stone-100 mt-1">
                    Select your dominant behavioral vibe:
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => selectStyle('bold')}
                    className="p-5 rounded-2xl border border-stone-850 hover:border-amber-450 bg-stone-900/40 hover:bg-stone-905 text-left transition-all hover:scale-[1.01] focus:outline-none"
                  >
                    <span className="block font-sans text-xs font-bold uppercase text-stone-100">Mysterious & Bold</span>
                    <span className="block font-sans text-[11px] text-stone-400 mt-2 font-light">
                      Smoky shadows, worn leather jacket, back alleys, heavy music, midnight records.
                    </span>
                  </button>
                  <button
                    onClick={() => selectStyle('vibrant')}
                    className="p-5 rounded-2xl border border-stone-850 hover:border-amber-4?5 bg-stone-900/40 hover:bg-stone-905 text-left transition-all hover:scale-[1.01] focus:outline-none"
                  >
                    <span className="block font-sans text-xs font-bold uppercase text-stone-100">Electric & Vivid</span>
                    <span className="block font-sans text-[11px] text-stone-400 mt-2 font-light">
                      Futuristic cities, digital lights, shocking pinks, velvet clubs, sweet complex textures.
                    </span>
                  </button>
                  <button
                    onClick={() => selectStyle('casual')}
                    className="p-5 rounded-2xl border border-stone-850 hover:border-amber-450 bg-stone-900/40 hover:bg-stone-905 text-left transition-all hover:scale-[1.01] focus:outline-none"
                  >
                    <span className="block font-sans text-xs font-bold uppercase text-stone-100">Crisp & Unbound</span>
                    <span className="block font-sans text-[11px] text-stone-400 mt-2 font-light">
                      Charred wilderness, salty wind, bitter zest, rugged woodsmoke, raw nature.
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 pt-4">
                  <span>Aura Rebel Custom Algorithm</span>
                  <button onClick={resetQuiz} className="hover:text-stone-300">Abort Quiz</button>
                </div>
              </div>
            )}

            {/* Step 2: Choose Envs */}
            {quizStep === 2 && (
              <div className="space-y-6 my-auto">
                <div>
                  <span className="font-mono text-[10px] uppercase text-amber-500 font-bold">Query 02 of 02</span>
                  <h3 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-wide text-stone-100 mt-1">
                    When is your rebellion most active?
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => selectEnv('day')}
                    className="p-5 rounded-2xl border border-stone-850 hover:border-amber-450 bg-stone-900/40 hover:bg-stone-905 text-left transition-all hover:scale-[1.01] focus:outline-none"
                  >
                    <span className="block font-sans text-xs font-bold uppercase text-stone-100">Under the sun</span>
                    <span className="block font-sans text-[11px] text-stone-400 mt-2 font-light">
                      Fresh air, bright studio lighting, outdoor spaces, clean minimalist confidence.
                    </span>
                  </button>
                  <button
                    onClick={() => selectEnv('night')}
                    className="p-5 rounded-2xl border border-stone-850 hover:border-amber-450 bg-stone-900/40 hover:bg-stone-905 text-left transition-all hover:scale-[1.01] focus:outline-none"
                  >
                    <span className="block font-sans text-xs font-bold uppercase text-stone-100">Deep Night Only</span>
                    <span className="block font-sans text-[11px] text-stone-400 mt-2 font-light">
                      Dimly lit venues, private parties, heavy intimacy, smoky projection that breaks barriers.
                    </span>
                  </button>
                  <button
                    onClick={() => selectEnv('anytime')}
                    className="p-5 rounded-2xl border border-stone-850 hover:border-amber-450 bg-stone-900/40 hover:bg-stone-905 text-left transition-all hover:scale-[1.01] focus:outline-none"
                  >
                    <span className="block font-sans text-xs font-bold uppercase text-stone-100">All-Day Anarchy</span>
                    <span className="block font-sans text-[11px] text-stone-400 mt-2 font-light">
                      Versatile impact, switching from boardrooms to backrooms without re-spraying.
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 pt-4">
                  <span>Aura Rebel Custom Algorithm</span>
                  <button onClick={resetQuiz} className="hover:text-stone-300">Abort Quiz</button>
                </div>
              </div>
            )}

            {/* Step 3: Recommendations Result */}
            {quizStep === 3 && recommendedPerfume && (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold tracking-widest flex items-center justify-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    <span>DIAGNOSIS COMPLETE: ALIGNED CODENAME</span>
                  </span>
                  <h3 className="font-sans text-2xl font-black uppercase text-stone-100 mt-1">
                    {recommendedPerfume.name}
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center bg-stone-900/40 border border-stone-850 p-5 rounded-2xl">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-950 flex-shrink-0">
                    <img 
                      src={recommendedPerfume.image} 
                      alt={recommendedPerfume.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2 flex-grow text-center md:text-left">
                    <span className="inline-block bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md text-[9px] font-mono uppercase text-amber-400">
                      {recommendedPerfume.category}
                    </span>
                    <p className="font-sans text-xs text-stone-300 leading-relaxed font-light">
                      {recommendedPerfume.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center md:justify-start pt-1">
                      {recommendedPerfume.topNotes.slice(0, 3).map((n) => (
                        <span key={n} className="bg-stone-950 px-2 py-0.5 rounded text-[9px] font-mono text-stone-400">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-stone-950 border-t border-stone-900 pt-5 mt-4 space-y-4 sm:space-y-0">
                  <button 
                    onClick={resetQuiz} 
                    className="font-sans text-[11px] font-bold tracking-widest text-stone-400 hover:text-stone-100 uppercase uppercase flex items-center space-x-2 focus:none cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restart Match</span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onSelectProduct(recommendedPerfume)}
                      className="bg-amber-450 hover:bg-amber-400 text-stone-950 px-6 py-2.5 rounded-xl font-sans text-xs font-black uppercase tracking-widest cursor-pointer transition-all"
                    >
                      Inspect Blueprint
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Instagram Feed Integration Mock (referencing brand request: Instagram: aurarebel_perfumes) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-rose-400 uppercase tracking-[0.35em] font-bold">Insta Community</span>
          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-100 mt-2">
            @aurarebel_perfumes
          </h2>
          <p className="font-sans text-xs text-stone-400 mt-2 font-light max-w-md mx-auto leading-relaxed">
            Follow our Instagram handle for weekly product updates, custom scent layering combinations, and unboxing feeds from rebels worldwide.
          </p>
          <a
            href="https://www.instagram.com/aurarebel_perfumes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center mt-3 text-xs text-rose-400 hover:text-rose-300 transition-colors font-mono tracking-wider space-x-1"
          >
            <span>Visit aurarebel_perfumes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dynamic grid for instagram feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramMockPosts.map((post) => (
            <div 
              key={post.id} 
              className="group relative bg-stone-900/30 border border-stone-900 rounded-2xl overflow-hidden shadow-md flex flex-col hover:border-stone-850"
            >
              <div className="relative aspect-square overflow-hidden bg-stone-950">
                <img 
                  src={post.image} 
                  alt={post.tag} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 filter grayscale hover:grayscale-0 duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover details overlay */}
                <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-amber-400 font-bold">{post.tag}</span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>
                  
                  <p className="font-sans text-xs text-stone-200 mt-4 leading-relaxed font-light">
                    {post.caption}
                  </p>

                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.comments} comments</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-stone-900/50 flex items-center justify-between">
                <span className="font-mono text-[11px] text-stone-400">@aurarebel_perfumes</span>
                <span className="bg-stone-900 px-2 py-1 rounded text-[9px] font-mono text-amber-500 hover:text-amber-450">Insta Hub</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand values banner */}
      <section className="py-16 bg-gradient-to-r from-stone-900 to-stone-950/50 text-center border-t border-stone-900">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="font-mono text-[10px] text-amber-500 uppercase tracking-[0.4em] font-semibold">Our Unyielding Commitment</p>
          <blockquote className="font-sans text-lg sm:text-2xl font-semibold text-stone-100 italic leading-relaxed">
            "Art shouldn’t conform. Your scent shouldn’t either. Aura Rebel was started to provide unmatched longevity without the luxury markup."
          </blockquote>
          <div className="flex justify-center space-x-1 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="w-8 h-[2px] bg-amber-500 self-center" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
        </div>
      </section>

    </div>
  );
}
