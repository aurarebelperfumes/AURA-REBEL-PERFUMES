import { Perfume, Collection, Review } from '../types';

export const PERFUMES: Perfume[] = [
  {
    id: 'midnight-rebel',
    name: 'Midnight Rebel',
    category: 'Woody & Smoky',
    price: 85,
    price100ml: 140,
    description: 'A dark, untethered fusion of rugged leather, smoked oud, and black pepper. Designed for those who rule the night.',
    story: 'Born from midnight street lights and leather jackets. Midnight Rebel opens with a shocking burst of sharp black pepper and spicy saffron, before diving deep into an uninhibited core of raw leather and incense. A base of rich, mysterious vetiver and smoked oud leaves an unforgettable, rebellious trail.',
    topNotes: ['Black Pepper', 'Saffron', 'Grapefruit'],
    middleNotes: ['Suede Leather', 'Incense', 'Nutmeg'],
    baseNotes: ['Smoked Oud', 'Earthy Vetiver', 'Dark Patchouli', 'Ambergris'],
    longevity: 5,
    projection: 4,
    intensity: 'Extravagant',
    image: '/src/assets/images/midnight_rebel_1781902639862.jpg',
    rating: 4.9,
    reviewsCount: 142,
    sizes: [50, 100],
    bestFor: 'Night / Fall & Winter'
  },
  {
    id: 'neon-flora',
    name: 'Neon Flora',
    category: 'Electric Floral',
    price: 75,
    price100ml: 125,
    description: 'An explosive floral rebellion blending black orchid, rhubarb, night jasmine, and liquid amber.',
    story: 'A classic floral rewritten with unapologetic grit. Neon Flora turns delicate petals into an electric current. Sour rhubarb and sharp pink pepper jar the senses before collapsing into a hypnotic heart of dark midnight jasmine and velvet orchids. The landing is warm, sweet, and sticky with golden amber and musk.',
    topNotes: ['Pink Pepper', 'Rhubarb', 'Violet Leaves'],
    middleNotes: ['Black Orchid', 'Night Jasmine', 'Turkish Rose'],
    baseNotes: ['Liquid Amber', 'Sandalwood', 'Vanilla Suede', 'White Musk'],
    longevity: 4,
    projection: 5,
    intensity: 'Intense',
    image: '/src/assets/images/neon_flora_1781902655412.jpg',
    rating: 4.8,
    reviewsCount: 98,
    sizes: [50, 100],
    bestFor: 'Day & Night / Spring & Summer'
  },
  {
    id: 'citrus-outlaw',
    name: 'Citrus Outlaw',
    category: 'Fresh & Spicy',
    price: 70,
    price100ml: 115,
    description: 'A crisp, rule-breaking citrus featuring charred blood orange, bitter line, juniper, and wild vetiver.',
    story: 'Freshness, but make it dangerous. Citrus Outlaw shuns the gentle, sweet citrus trope. It utilizes burnt, caramelized blood orange fused with absolute bitter lime and sharp juniper berries. A beating spice heart of fresh cardamom and ginger gives way to an aggressively earthy, smoky vetiver and dark oakmoss.',
    topNotes: ['Charred Blood Orange', 'Bitter Lime', 'Juniper Berries'],
    middleNotes: ['Fresh Mint', 'Cardamom', 'Ginger Root'],
    baseNotes: ['Smoky Vetiver', 'Cedarwood', 'Oakmoss', 'Sandalwood'],
    longevity: 4,
    projection: 4,
    intensity: 'Medium',
    image: '/src/assets/images/citrus_outlaw_1781902669319.jpg',
    rating: 4.7,
    reviewsCount: 115,
    sizes: [50, 100],
    bestFor: 'Day / Spring & Summer'
  },
  {
    id: 'voodoo-desire',
    name: 'Voodoo Desire',
    category: 'Warm & Spicy Amber',
    price: 90,
    price100ml: 150,
    description: 'A mystical and enchanting warm elixir loaded with raw vanilla pods, burning incense, and spicy cinnamon bark.',
    story: 'An enchanting, intimate trap of a scent. Voodoo Desire is built around the raw, untamed sweetness of Madagascar vanilla pods. Infused with curls of woodsmoke and a fiery pinch of hot Ceylon cinnamon, it draws you in and grips you. A base of rich benzoin resin and dry sandalwood lingers on the skin like a warm, dark memories.',
    topNotes: ['Cinnamon Bark', 'Spiced Bergamot', 'Clove Bud'],
    middleNotes: ['Vanilla Bean', 'Myrrh Resin', 'Tobacco Absolute'],
    baseNotes: ['Warm Amber', 'Benzoin', 'Sandalwood', 'Cacao pod'],
    longevity: 5,
    projection: 5,
    intensity: 'Extravagant',
    image: '/src/assets/images/voodoo_desire_1781902704385.jpg',
    rating: 4.9,
    reviewsCount: 186,
    sizes: [50, 100],
    bestFor: 'Night / Fall & Winter'
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'outlaw-duo',
    name: 'The Outlaw Edits',
    tagline: 'Bold contrasts. Zero compromise.',
    description: 'A combination of rugged woods and unyielding citrus. Featuring Midnight Rebel and Citrus Outlaw, this collection is designed for the modern rule-breaker who switches seamlessly from bright days to smoky nights.',
    coverImage: '/src/assets/images/hero_perfume_banner_1781902624352.jpg',
    accentColor: 'from-amber-600 to-stone-900',
    perfumeIds: ['midnight-rebel', 'citrus-outlaw']
  },
  {
    id: 'nocturnal-eclipse',
    name: 'Midnight & Mysticism',
    tagline: 'Sensual, sticky, and dangerously intoxicating.',
    description: 'Exploring the rich, sweet, and warm realms of smell. Featuring Neon Flora and Voodoo Desire, this duo pairs deep violet light orchids with vanilla resin smoke to create an irresistible midnight aura.',
    coverImage: '/src/assets/images/voodoo_desire_1781902704385.jpg',
    accentColor: 'from-purple-800 to-rose-950',
    perfumeIds: ['neon-flora', 'voodoo-desire']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    perfumeId: 'midnight-rebel',
    author: 'Seraphina K.',
    rating: 5,
    date: '2026-05-12',
    comment: 'This scent is dangerous! I get compliments every single time I wear it. The leather combined with smoke notes is so deep and confident.'
  },
  {
    id: 'rev-2',
    perfumeId: 'midnight-rebel',
    author: 'Marcus V.',
    rating: 4,
    date: '2026-06-02',
    comment: 'Insanely long-lasting. Outlasts standard premium brands. Highly recommended if you love dark, woody notes with a heavy projection.'
  },
  {
    id: 'rev-3',
    perfumeId: 'neon-flora',
    author: 'Elena T.',
    rating: 5,
    date: '2026-04-28',
    comment: 'It stands out so much. Most florals are generic, but this pink rhubarb and pink pepper note makes it neon, punchy, and modern.'
  },
  {
    id: 'rev-4',
    perfumeId: 'citrus-outlaw',
    author: 'Jasper D.',
    rating: 5,
    date: '2026-05-30',
    comment: 'The burnt blood orange note is exceptional. It is citrus clean but with a smoky edge that keeps people guessing.'
  },
  {
    id: 'rev-5',
    perfumeId: 'voodoo-desire',
    author: 'Zara S.',
    rating: 5,
    date: '2026-06-15',
    comment: 'My signature scent from now on! Outstanding vanilla absolute blended with premium incense. Simply mystical.'
  },
  {
    id: 'rev-6',
    perfumeId: 'voodoo-desire',
    author: 'Christian L.',
    rating: 4,
    date: '2026-06-18',
    comment: 'Deeply sensual. Extremely sweet but perfectly balanced by dry wood and clove note. Incredible formulation!'
  }
];
