// Categories page - Browse products by category
// Features: Category cards with links to filtered products

import { Link } from 'react-router-dom';
import { Guitar, Mic, Headphones, Disc3, ArrowRight, Music } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { products } from '@/data/products';

const categoryData = [
  {
    id: 'instruments',
    name: 'Instruments',
    description: 'Electric and acoustic guitars, keyboards, synthesizers, and more professional instruments for musicians of all levels.',
    icon: Guitar,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
    color: 'primary',
  },
  {
    id: 'studio-gear',
    name: 'Studio Gear',
    description: 'Professional recording equipment including microphones, audio interfaces, monitors, and turntables for your studio setup.',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    color: 'secondary',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'High-quality headphones, speakers, cables, and essential accessories to complete your music experience.',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
    color: 'accent',
  },
  {
    id: 'vinyl',
    name: 'Vinyl Records',
    description: 'Classic albums and new releases on premium vinyl. Experience music the way it was meant to be heard.',
    icon: Disc3,
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800',
    color: 'primary',
  },
];

const Categories = () => {
  const getCategoryCount = (categoryId: string) => {
    return products.filter(p => p.category === categoryId).length;
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Shop by Category
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Browse our curated collection of music equipment across different categories
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {categoryData.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:from-transparent md:via-card/50 md:to-card" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 md:p-8 flex flex-col justify-center">
                    <div className={`w-14 h-14 rounded-xl bg-${category.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className={`w-7 h-7 text-${category.color}`} />
                    </div>
                    
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      {category.name}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {getCategoryCount(category.id)} products
                      </span>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>Browse</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* All Products CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all group"
            >
              <span className="font-display font-semibold text-foreground">
                View All {products.length} Products
              </span>
              <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
