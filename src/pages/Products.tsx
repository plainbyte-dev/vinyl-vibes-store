// Products page - Displays all products with filtering and search
// Features: Category filter, search, grid/list view toggle

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories, searchProducts, getProductsByCategory } from '@/data/products';
import { cn } from '@/lib/utils';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const activeCategory = searchParams.get('category') || 'all';

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(activeCategory);
    
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery).filter(p => 
        activeCategory === 'all' || p.category === activeCategory
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              All Products
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover our collection of {products.length} premium music products
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              
              <div className="flex items-center gap-1 bg-card rounded-lg p-1 border border-border">
                <Button
                  variant={isGridView ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setIsGridView(true)}
                  className="w-9 h-9"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={!isGridView ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setIsGridView(false)}
                  className="w-9 h-9"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={cn(
              "lg:w-64 shrink-0",
              showFilters ? "block" : "hidden lg:block"
            )}>
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg transition-all",
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className={cn(
                  "grid gap-6",
                  isGridView
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}>
                  {filteredProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
