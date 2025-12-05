// Home page - Main landing page for SoundWave music store
// Features: Hero, Featured Products, Categories, Best Sellers, Newsletter

import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoriesSection } from '@/components/home/Categories';
import { BestSellers } from '@/components/home/BestSellers';
import { Newsletter } from '@/components/home/Newsletter';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <CategoriesSection />
      <BestSellers />
      <Newsletter />
    </Layout>
  );
};

export default Index;
