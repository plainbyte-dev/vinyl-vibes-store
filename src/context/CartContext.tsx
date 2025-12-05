// Cart Context - Manages shopping cart state across the application
// Uses localStorage to persist cart data between sessions

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

// Cart item includes product data and quantity
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Calculate total price and item count from cart items
const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  return items.reduce(
    (acc, item) => ({
      total: acc.total + item.product.price * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { total: 0, itemCount: 0 }
  );
};

// Cart reducer handles all cart state changes
const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      break;

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.product.id !== action.payload);
      break;

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter(item => item.product.id !== action.payload.id);
      } else {
        newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;

    case 'CLEAR_CART':
      newItems = [];
      break;

    case 'LOAD_CART':
      newItems = action.payload;
      break;

    default:
      return state;
  }

  const { total, itemCount } = calculateTotals(newItems);
  return { items: newItems, total, itemCount };
};

// Local storage key for cart persistence
const CART_STORAGE_KEY = 'soundwave-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: string): boolean => {
    return state.items.some(item => item.product.id === productId);
  };

  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
