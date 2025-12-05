// Product card component with hover effects and animations
// Displays product image, name, price, rating, and add to cart button

import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className="group relative bg-gradient-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.featured && (
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            Featured
          </span>
        )}
        {product.bestSeller && (
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
            Best Seller
          </span>
        )}
        {product.originalPrice && (
          <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-background transition-all opacity-0 group-hover:opacity-100">
        <Heart className="w-5 h-5" />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {product.category.replace('-', ' ')}
        </span>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-foreground mt-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="icon"
            variant={isInCart(product.id) ? "default" : "outline"}
            onClick={handleAddToCart}
            className={cn(
              "shrink-0",
              isInCart(product.id) && "glow-primary"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
