// Product detail page - Shows full product information
// Features: Image gallery, description, reviews, add to cart

import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Heart, Star, Truck, Shield, RefreshCw, ChevronLeft, Plus, Minus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/products/ProductCard';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useCart();

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-primary capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Back Button (Mobile) */}
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 md:hidden">
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                        selectedImage === index
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Category & Badges */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {product.bestSeller && (
                  <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "text-secondary fill-secondary"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-destructive/20 text-destructive text-sm font-semibold rounded">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span className={cn(
                  "w-3 h-3 rounded-full",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )} />
                <span className={product.inStock ? "text-green-500" : "text-red-500"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-foreground">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant={isInCart(product.id) ? "gold" : "hero"}
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInCart(product.id) ? "Add More to Cart" : "Add to Cart"}
                </Button>

                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {[
                  { icon: Truck, text: "Free Shipping" },
                  { icon: Shield, text: "2 Year Warranty" },
                  { icon: RefreshCw, text: "30-Day Returns" },
                ].map((feature) => (
                  <div key={feature.text} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
