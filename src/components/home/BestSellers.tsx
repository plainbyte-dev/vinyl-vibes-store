// Best sellers section with horizontal scroll on mobile
// Highlights top-selling products

import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { getBestSellers } from '@/data/products';

export const BestSellers = () => {
  const bestSellers = getBestSellers();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <span className="text-sm font-medium text-secondary uppercase tracking-wider">
                Trending now
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Best Sellers
              </h2>
            </div>
          </div>
          <Link to="/products">
            <Button variant="gold" className="group">
              Shop Best Sellers
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
