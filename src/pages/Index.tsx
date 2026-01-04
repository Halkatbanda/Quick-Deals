import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import DealCard from '@/components/DealCard';
import { getDeals, getCategories, type Deal } from '@/lib/dealsStore';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const allDeals = getDeals().filter(d => d.isActive);
    setDeals(allDeals);
  }, []);

  const categories = ['All', ...getCategories()];

  const filteredDeals = activeCategory === 'All' 
    ? deals 
    : deals.filter(d => d.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Deals Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Today's Best Deals</h2>
                <p className="text-muted-foreground">Handpicked offers with maximum savings</p>
              </div>
            </div>
            <Link to="/categories">
              <Button variant="outline" className="gap-2">
                View All Deals
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.slice(0, 8).map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No deals found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Finding the best deals has never been easier. Follow these simple steps to save money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse Deals',
                description: 'Explore our curated collection of the best deals from top stores.',
              },
              {
                step: '02',
                title: 'Click to Buy',
                description: 'Found something you like? Click the deal to visit the store.',
              },
              {
                step: '03',
                title: 'Save Money',
                description: 'Complete your purchase and enjoy amazing discounts!',
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
