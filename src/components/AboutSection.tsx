import React, { useState } from 'react';
import { ShieldCheck, Droplet, Users, Sparkles, Smile, RefreshCw, Eye, Flame, MapPin } from 'lucide-react';

export default function AboutSection() {
  const [selectedIngredient, setSelectedIngredient] = useState<string>('oud');

  const ingredients = [
    {
      id: 'oud',
      name: 'Artisanal Smoked Oud',
      origin: 'Ethically Sourced, Assam Rainforests',
      description: 'Extracted only from naturally fallen Aquilaria trees. Our oud undergoes a specialized 30-day smoky curing process, resulting in highly potent, dark, amber-sweet animalic wood notes that lock sillage on the skin.',
      effect: 'Evokes grounding mystery, rugged power, and raw confidence.',
      vibeTag: 'Woody & Primal'
    },
    {
      id: 'jasmine',
      name: 'Night-Blooming Jasminum',
      origin: 'Grasse organic absolute, France',
      description: 'Hand-picked exclusively at midnight when jasmine blossoms emit their highest concentration of rich indolic compounds. We solvent-extract using environment-safe standards to retain the pure, seductive nectar without chemical residue.',
      effect: 'Evokes electric passion, hypnotic intimacy, and floral anarchy.',
      vibeTag: 'Intense Floral'
    },
    {
      id: 'citrus',
      name: 'Caramelized Blood Orange',
      origin: 'Volcanic orchards, Mount Etna Sicily',
      description: 'Cultivated in nutrient-packed ash soils. Squeezed and lightly scorched on dark slate, releasing smoky caramelized essential oils that preserve bitter rind properties alongside zesty energy currents.',
      effect: 'Evokes solar disruption, crisp vitality, and wild freshness.',
      vibeTag: 'Zesty & Smoky'
    },
    {
      id: 'vanilla',
      name: 'Cured Madagascar Vanilla Bean',
      origin: 'Ethical family-run co-ops, Sambava',
      description: 'Aged for 6 months in dark wooden trunks to crystallize vanillin sugars. Splits are cold-infused with organic sugar cane alcohol over 120 days, capturing highly complex layers of leather, tobacco-smoke, and absolute sweetness.',
      effect: 'Evokes mystical security, sticky seduction, and warm intimacy.',
      vibeTag: 'Sweet & Enchanting'
    }
  ];

  const activeIngredient = ingredients.find(i => i.id === selectedIngredient) || ingredients[0];

  const milestones = [
    { year: '2024', title: 'The Crack of Chaos', text: 'Started from an empty warehouse in East London by three rebel perfumers fed up with synthetic, watered-down designer labels.' },
    { year: '2025', title: 'Viral Scent Anarchy', text: 'Launched Instagram page @aurarebel_perfumes. Midnight Rebel becomes a niche underground sensation, selling out 3 complete batches via private DM waits.' },
    { year: '2026', title: 'Ethanol Reformulation', text: 'Secured direct supply lines with organic flower growers in France and Madagascar to declare complete, cruelty-free botanical transparency.' }
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-[90vh] py-16 font-sans" id="about-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-[0.3em] font-bold">Unveiling The Brand</span>
          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-100 mt-2">Our Manifesto</h2>
          <p className="font-sans text-xs text-stone-400 mt-2 leading-relaxed font-light">
            We exist at the volatile intersection of raw botanical nature and rebellious urban attitude. Luxury isn’t about golden caps—it is about pure oil purity.
          </p>
        </div>

        {/* Narrative & timeline grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-stone-100 flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Shattering High-Street Preconceptions</span>
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Conventional luxury perfume is 95% industrial alcohol, packaged in oversized cardboard boxes, and sold at 10x markups to cover glossy billboard campaigns. We find that offensive.
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              At **Aura Rebel**, our formulas utilize a massive 22% scent load concentration (Extrait de Parfum parameters). We source our wild woods, raw resins, and flowers from ethical, family-run botanical co-operatives. Each bottle is numbered by hand, representing an individual craft run that preserves natural scent variances.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-stone-900 border border-stone-850 rounded-2xl">
                <span className="block text-2xl font-black text-amber-400">22%</span>
                <span className="block text-[10px] font-mono uppercase text-stone-400 tracking-wide mt-1">Scent Oil Concentration</span>
              </div>
              <div className="p-4 bg-stone-900 border border-stone-850 rounded-2xl">
                <span className="block text-2xl font-black text-rose-500">100%</span>
                <span className="block text-[10px] font-mono uppercase text-stone-400 tracking-wide mt-1">Vegan & Botanical Base</span>
              </div>
            </div>
          </div>

          {/* Timeline cards */}
          <div className="lg:col-span-6 space-y-6 bg-stone-900/20 border border-stone-900 p-6 sm:p-10 rounded-3xl">
            <h4 className="font-sans text-xs font-bold tracking-widest text-stone-200 uppercase mb-4">Aura Rebel Timeline</h4>
            <div className="space-y-6 relative border-l border-stone-800 ml-3 pl-6">
              {milestones.map((ms) => (
                <div key={ms.year} className="relative">
                  {/* timeline dot indicator */}
                  <span className="absolute -left-[31px] top-0.5 w-[11px] h-[11px] rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 ring-4 ring-stone-950" />
                  <span className="block font-mono text-xs text-amber-400 font-bold">{ms.year}</span>
                  <span className="block font-sans text-xs font-bold text-stone-100 mt-1">{ms.title}</span>
                  <p className="font-sans text-[11px] text-stone-400 mt-1 leading-relaxed font-light">
                    {ms.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Interactive Raw Ingredient spotlight */}
        <section className="bg-stone-900/30 border border-stone-900 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="absolute bottom-[-150px] left-[-150px] w-[350px] h-[350px] bg-rose-550/10 rounded-full blur-3xl pointer-events-none" />

          {/* Intro text */}
          <div className="max-w-xl mb-10 space-y-1">
            <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-semibold flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-amber-500" />
              <span>ALCHEMICAL RAW MATERIAL REGISTRY</span>
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
              Botanical Sourcing Explorer
            </h3>
            <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
              We travel to remote volcanic soils and high-altitude rainforests to secure non-synthetic biological elements. Click an element to audit its sourcing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Sourcing Buttons list (Left) */}
            <div className="lg:col-span-4 flex flex-col space-y-2">
              {ingredients.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing.id)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedIngredient === ing.id
                      ? 'bg-stone-950 border-amber-500 shadow-lg'
                      : 'bg-stone-900 border-stone-900 hover:border-stone-850'
                  }`}
                  id={`ingredient-trigger-${ing.id}`}
                >
                  <p className={`font-sans text-xs font-bold uppercase transition-colors ${
                    selectedIngredient === ing.id ? 'text-amber-400' : 'text-stone-300'
                  }`}>
                    {ing.name}
                  </p>
                  <span className="block font-mono text-[9px] text-stone-500 uppercase tracking-wider mt-1">{ing.vibeTag}</span>
                </button>
              ))}
            </div>

            {/* Sourcing Details result panel (Right) */}
            <div className="lg:col-span-8 bg-stone-950 border border-stone-850 rounded-2xl p-6 sm:p-8 space-y-4 shadow-inner min-h-[220px] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0">
                  <span className="bg-amber-500/15 border border-amber-500/20 px-2.5 py-0.5 rounded text-[8px] font-mono uppercase text-amber-400">
                    {activeIngredient.origin}
                  </span>
                  <span className="font-mono text-[9px] text-stone-500 font-bold uppercase">{activeIngredient.vibeTag} Scent</span>
                </div>
                
                <h4 className="font-sans text-lg font-bold uppercase text-stone-100 pt-1.5">{activeIngredient.name}</h4>
                <p className="font-sans text-xs text-stone-300 leading-relaxed font-light">{activeIngredient.description}</p>
              </div>

              <div className="border-t border-stone-900 pt-4 mt-4 flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="font-sans text-xs font-semibold text-stone-200">
                  <span className="text-stone-400 font-light mr-1">Aesthetic Aura Mood:</span> {activeIngredient.effect}
                </p>
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
