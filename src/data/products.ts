// Product data for the music e-commerce store
// Contains 15 music-related products across 4 categories

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'instruments' | 'studio-gear' | 'accessories' | 'vinyl';
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fender Stratocaster Electric Guitar",
    description: "The iconic Fender Stratocaster delivers the bright, bell-like tone that has defined rock music for decades. Features alder body, maple neck, and three single-coil pickups for versatile sound options.",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "instruments",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600",
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600",
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600"
    ],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "2",
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation with two processors controlling 8 microphones. Exceptional sound quality with 30-hour battery life and crystal-clear hands-free calling.",
    price: 349.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
    ],
    rating: 4.9,
    reviews: 1567,
    inStock: true,
    featured: true
  },
  {
    id: "3",
    name: "Roland JUNO-DS88 Synthesizer",
    description: "Professional 88-key weighted synthesizer with extensive sound library, real-time controls, and powerful effects. Perfect for stage and studio performances.",
    price: 1599.99,
    originalPrice: 1799.99,
    category: "instruments",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600"
    ],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    bestSeller: true
  },
  {
    id: "4",
    name: "Shure SM7B Microphone",
    description: "The legendary broadcast microphone used by professionals worldwide. Delivers warm, smooth vocal reproduction with excellent rejection of electromagnetic hum.",
    price: 399.00,
    category: "studio-gear",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600"
    ],
    rating: 4.9,
    reviews: 2341,
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "5",
    name: "JBL Flip 6 Portable Speaker",
    description: "Bold JBL Original Pro Sound with punchy bass. IP67 waterproof and dustproof design with 12 hours of playtime. PartyBoost compatible.",
    price: 129.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
    ],
    rating: 4.6,
    reviews: 892,
    inStock: true
  },
  {
    id: "6",
    name: "Pink Floyd - The Dark Side of the Moon (Vinyl)",
    description: "50th Anniversary remastered edition on 180g vinyl. Experience this masterpiece as it was meant to be heard with pristine analog warmth.",
    price: 34.99,
    category: "vinyl",
    image: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=600",
    images: [
      "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=600"
    ],
    rating: 5.0,
    reviews: 456,
    inStock: true,
    featured: true
  },
  {
    id: "7",
    name: "Audio-Technica AT-LP120X Turntable",
    description: "Direct-drive professional turntable with USB output. Features adjustable dynamic anti-skate control and selectable phono preamp.",
    price: 279.00,
    originalPrice: 329.00,
    category: "studio-gear",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600"
    ],
    rating: 4.8,
    reviews: 678,
    inStock: true,
    bestSeller: true
  },
  {
    id: "8",
    name: "Yamaha HS8 Studio Monitors (Pair)",
    description: "8-inch powered studio monitors delivering flat, accurate response. Room control and high trim response for optimal placement flexibility.",
    price: 698.00,
    category: "studio-gear",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600"
    ],
    rating: 4.7,
    reviews: 312,
    inStock: true
  },
  {
    id: "9",
    name: "Daft Punk - Random Access Memories (Vinyl)",
    description: "Grammy-winning album on double 180g vinyl. Features 'Get Lucky' and 'Instant Crush'. Gatefold sleeve with exclusive artwork.",
    price: 39.99,
    category: "vinyl",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600",
    images: [
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600"
    ],
    rating: 4.9,
    reviews: 234,
    inStock: true
  },
  {
    id: "10",
    name: "Focusrite Scarlett 2i2 Audio Interface",
    description: "Third generation USB audio interface with two award-winning Scarlett mic preamps. Air mode for brighter, more open recordings.",
    price: 179.99,
    category: "studio-gear",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600"
    ],
    rating: 4.8,
    reviews: 1823,
    inStock: true,
    bestSeller: true
  },
  {
    id: "11",
    name: "Gibson Les Paul Standard '50s",
    description: "The gold standard of electric guitars. Mahogany body, maple top, Burstbucker pickups deliver that legendary Les Paul tone.",
    price: 2499.00,
    category: "instruments",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600"
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    featured: true
  },
  {
    id: "12",
    name: "AKG K712 Pro Studio Headphones",
    description: "Reference open-back headphones with flat frequency response. Designed for precision listening in mixing and mastering environments.",
    price: 349.00,
    originalPrice: 399.00,
    category: "studio-gear",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600"
    ],
    rating: 4.7,
    reviews: 423,
    inStock: true
  },
  {
    id: "13",
    name: "Kendrick Lamar - To Pimp A Butterfly (Vinyl)",
    description: "Critically acclaimed album on double vinyl. A groundbreaking fusion of jazz, funk, and hip-hop that redefined the genre.",
    price: 44.99,
    category: "vinyl",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600",
    images: [
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600"
    ],
    rating: 4.8,
    reviews: 189,
    inStock: true
  },
  {
    id: "14",
    name: "MIDI Keyboard Controller - Novation Launchkey 49",
    description: "49-key USB MIDI controller with velocity-sensitive pads, faders, and knobs. Deep integration with Ableton Live and other DAWs.",
    price: 199.99,
    category: "instruments",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600"
    ],
    rating: 4.6,
    reviews: 567,
    inStock: true
  },
  {
    id: "15",
    name: "Premium Guitar Cable Set (3-Pack)",
    description: "Professional-grade instrument cables with gold-plated connectors. Includes 10ft, 15ft, and 20ft lengths. Lifetime warranty.",
    price: 49.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1558098329-a11cff621064?w=600",
    images: [
      "https://images.unsplash.com/photo-1558098329-a11cff621064?w=600"
    ],
    rating: 4.5,
    reviews: 234,
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'music' },
  { id: 'instruments', name: 'Instruments', icon: 'guitar' },
  { id: 'studio-gear', name: 'Studio Gear', icon: 'mic' },
  { id: 'accessories', name: 'Accessories', icon: 'headphones' },
  { id: 'vinyl', name: 'Vinyl Records', icon: 'disc' },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
