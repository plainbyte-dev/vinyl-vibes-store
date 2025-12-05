// Newsletter subscription section with music-themed design
// Features animated waveform background

import { Mail, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing! Check your inbox for exclusive deals.');
      setEmail('');
    }
  };

  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--primary))_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--primary))_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8">
            <Music2 className="w-10 h-10 text-primary" />
          </div>

          {/* Text */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Stay in <span className="text-gradient-primary">Tune</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals, and music inspiration delivered straight to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full h-14 pl-12 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="h-14 px-8">
              Subscribe
            </Button>
          </form>

          {/* Trust badges */}
          <p className="text-sm text-muted-foreground mt-6">
            🔒 No spam, unsubscribe anytime. Join 50,000+ music lovers!
          </p>
        </div>
      </div>
    </section>
  );
};
