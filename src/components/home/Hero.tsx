// Hero section with animated waveform background
// Features: Headline, CTA buttons, animated visual elements

import { Link } from 'react-router-dom';
import { Play, ShoppingBag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        
        {/* Waveform Lines */}
        <svg className="absolute bottom-0 left-0 right-0 h-64 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            d="M0,160 C320,300,420,100,640,160 C880,220,920,80,1140,160 C1280,220,1380,140,1440,160"
            className="animate-waveform"
          />
          <path
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            d="M0,200 C320,100,420,260,640,200 C880,140,920,280,1140,200 C1280,140,1380,220,1440,200"
            className="animate-waveform"
            style={{ animationDelay: '0.3s' }}
          />
        </svg>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">New Collection Available</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-foreground">Feel The</span>
              <br />
              <span className="text-gradient-primary">Sound</span>
              <span className="text-foreground">, Own The</span>
              <br />
              <span className="text-gradient-gold">Moment</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Discover premium instruments, studio gear, and vinyl records. 
              Elevate your music experience with gear trusted by professionals worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button variant="hero" size="xl" className="group">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="hero-outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Story
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              {[
                { value: '10K+', label: 'Products' },
                { value: '50K+', label: 'Customers' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            {/* Main Image Container */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full border border-secondary/20" />
              <div className="absolute inset-8 rounded-full border border-accent/20" />
              
              {/* Center Image */}
              <div className="absolute inset-16 rounded-full overflow-hidden bg-gradient-card border border-border">
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600"
                  alt="Music Equipment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Product Cards */}
              <div className="absolute -left-8 top-1/4 glass rounded-xl p-3 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">🎸</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Guitars</div>
                    <div className="text-xs text-primary">20% OFF</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/2 glass rounded-xl p-3 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <span className="text-2xl">🎧</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Headphones</div>
                    <div className="text-xs text-secondary">Best Sellers</div>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/4 -bottom-4 glass rounded-xl p-3 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <span className="text-2xl">💿</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Vinyl</div>
                    <div className="text-xs text-accent">New Arrivals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
