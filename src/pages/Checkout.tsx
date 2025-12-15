import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ChevronLeft, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // PLACE ORDER & REDIRECT TO ESEWA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsProcessing(true);

    try {
      // 1️⃣ Create order in backend
      const orderRes = await axios.post(`http://localhost:5000/api/orders`, {
        items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
        total: grandTotal,
      });

      const order = orderRes.data;

      // 2️⃣ Redirect to eSewa payment
      const esewaForm = document.createElement('form');
      esewaForm.method = 'POST';
      esewaForm.action = 'https://esewa.com.np/epay/main';

      const params: Record<string, string> = {
        amt: grandTotal.toFixed(2),
        psc: '0',
        pdc: '0',
        tAmt: grandTotal.toFixed(2),
        pid: order._id,
        scd: import.meta.env.VITE_ESEWA_MERCHANT_CODE!,
        su: `${window.location.origin}/payment-success?orderId=${order._id}`,
        fu: `${window.location.origin}/payment-cancel`,
      };

      for (const key in params) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        esewaForm.appendChild(input);
      }

      document.body.appendChild(esewaForm);
      esewaForm.submit();

    } catch (error) {
      console.error(error);
      toast.error('Failed to create order');
      setIsProcessing(false);
    }
  };

  // Order complete view after eSewa success
  if (orderComplete) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="hero" size="lg">Continue Shopping</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <Link to="/products">
              <Button variant="hero">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const InputField = ({ label, name, type = 'text', placeholder, required = true }: {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={cn(
          "w-full h-12 px-4 bg-muted border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
          errors[name] ? "border-destructive" : "border-border"
        )}
      />
      {errors[name] && <p className="text-sm text-destructive mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">Contact Information</h2>
                  <InputField label="Email" name="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">Shipping Address</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First Name" name="firstName" placeholder="John" />
                    <InputField label="Last Name" name="lastName" placeholder="Doe" />
                    <div className="md:col-span-2">
                      <InputField label="Address" name="address" placeholder="123 Music Street" />
                    </div>
                    <InputField label="City" name="city" placeholder="Sound City" />
                    <InputField label="State" name="state" placeholder="CA" />
                    <InputField label="ZIP Code" name="zip" placeholder="90210" />
                    <InputField label="Phone" name="phone" placeholder="+1 (555) 123-4567" required={false} />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-foreground">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-display font-bold text-foreground">Total</span>
                      <span className="font-display text-xl font-bold text-foreground">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full mt-6" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : <> <ShieldCheck className="w-5 h-5" /> Pay with eSewa </>}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
