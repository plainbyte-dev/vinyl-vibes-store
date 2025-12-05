// Categories showcase section with animated cards
// Links to filtered product views

import { Link } from 'react-router-dom';
import { Guitar, Mic, Headphones, Disc3, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'instruments',
    name: 'Instruments',
    description: 'Guitars, keyboards, and more',
    icon: Guitar,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400',
    color: 'primary',
  },
  {
    id: 'studio-gear',
    name: 'Studio Gear',
    description: 'Professional recording equipment',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    color: 'secondary',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Headphones, cables & more',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    color: 'accent',
  },
  {
    id: 'vinyl',
    name: 'Vinyl Records',
    description: 'Classic albums on vinyl',
    icon: Disc3,
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=400',
    color: 'primary',
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Browse by category
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Shop Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-${category.color}/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-7 h-7 text-${category.color}`} />
                </div>
                
                {/* Text */}
                <h3 className="font-display text-xl font-bold text-foreground">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
                
                {/* Arrow */}
                <div className="flex items-center gap-2 mt-4 text-primary">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
