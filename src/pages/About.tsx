// About page - Company story and values
// Features: Hero section, team info, mission statement

import { Layout } from '@/components/layout/Layout';
import { Music, Heart, Award, Users, Headphones, Guitar } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8">
                <Music className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Our <span className="text-gradient-primary">Passion</span> is Music
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                At SoundWave, we believe that great music deserves great gear. Since our founding, 
                we've been dedicated to providing musicians and music lovers with the finest equipment 
                to bring their creative visions to life.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Story</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  From Music Lovers, For Music Lovers
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2020 by a group of passionate musicians, SoundWave started as a small 
                    online shop with a big dream: to make professional-quality music gear accessible 
                    to everyone.
                  </p>
                  <p>
                    Today, we've grown into a trusted destination for thousands of musicians worldwide. 
                    From bedroom producers to touring professionals, we serve artists at every stage 
                    of their journey.
                  </p>
                  <p>
                    Our team hand-selects every product in our catalog, ensuring that whether you're 
                    buying your first guitar or upgrading your studio monitors, you're getting gear 
                    that meets our exacting standards.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800"
                    alt="Music studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 bg-card rounded-2xl border border-border shadow-xl">
                  <div className="font-display text-4xl font-bold text-primary">5+</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Values</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                What Drives Us
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Passion',
                  description: 'Music is at the heart of everything we do. We understand the joy of creating and sharing music because we live it every day.'
                },
                {
                  icon: Award,
                  title: 'Quality',
                  description: 'We never compromise on quality. Every product in our catalog is tested and approved by our team of music professionals.'
                },
                {
                  icon: Users,
                  title: 'Community',
                  description: 'We\'re building more than a store—we\'re building a community of music lovers who support and inspire each other.'
                }
              ].map((value) => (
                <div key={value.title} className="text-center p-8 bg-card rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Products Sold', icon: Guitar },
                { value: '50K+', label: 'Happy Customers', icon: Users },
                { value: '4.9', label: 'Average Rating', icon: Award },
                { value: '24/7', label: 'Customer Support', icon: Headphones },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
