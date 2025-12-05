// Footer component with music-themed aesthetics
// Features: Social links, navigation, newsletter signup

import { Link } from 'react-router-dom';
import { Music, Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Waveform decoration */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary" />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-xl font-bold text-gradient-primary">
                SoundWave
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your premier destination for quality music gear, instruments, and vinyl records. 
              Experience the sound of excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Facebook, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Products', 'Categories', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Instruments', 'Studio Gear', 'Accessories', 'Vinyl Records', 'Best Sellers'].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/products"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Music Street, Sound City</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@soundwave.store</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium text-foreground text-sm mb-2">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-10 px-3 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="px-4">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 SoundWave. All rights reserved.
          </p>
          
          {/* Animated Equalizer */}
          <div className="flex items-end gap-1 h-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full equalizer-bar"
                style={{ height: '8px' }}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
