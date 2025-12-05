// Shopping cart page - Shows cart items with quantity controls
// Features: Update quantities, remove items, order summary, checkout link

import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground mt-1">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-card rounded-2xl border border-border p-4 md:p-6"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.product.id}`}>
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {item.product.category.replace('-', ' ')}
                          </span>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-display text-xl font-bold text-foreground">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (8%)</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>

                  {shipping === 0 && (
                    <div className="px-4 py-3 bg-primary/10 rounded-lg text-sm text-primary">
                      🎉 You've qualified for free shipping!
                    </div>
                  )}

                  {total < 100 && (
                    <div className="px-4 py-3 bg-secondary/10 rounded-lg text-sm text-secondary">
                      Add ${(100 - total).toFixed(2)} more for free shipping
                    </div>
                  )}

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-display text-lg font-bold text-foreground">Total</span>
                      <span className="font-display text-2xl font-bold text-foreground">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block mt-6">
                  <Button variant="hero" size="lg" className="w-full">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/products" className="block mt-4">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
