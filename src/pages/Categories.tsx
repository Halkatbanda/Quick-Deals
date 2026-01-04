import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DealCard from '@/components/DealCard';
import { getDeals, getCategories, type Deal } from '@/lib/dealsStore';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'discount'>('newest');

  useEffect(() => {
    const allDeals = getDeals().filter(d => d.isActive);
    setDeals(allDeals);
  }, []);

  const categories = ['All', ...getCategories()];

  let filteredDeals = activeCategory === 'All' 
    ? deals 
    : deals.filter(d => d.category === activeCategory);

  // Sort deals
  filteredDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.currentPrice - b.currentPrice;
      case 'price-high':
        return b.currentPrice - a.currentPrice;
      case 'discount':
        const discountA = ((a.originalPrice - a.currentPrice) / a.originalPrice) * 100;
        const discountB = ((b.originalPrice - b.currentPrice) / b.originalPrice) * 100;
        return discountB - discountA;
      case 'newest':
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse All Deals</h1>
          <p className="text-muted-foreground">
            Discover {deals.length}+ amazing deals across all categories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    {category}
                    {activeCategory !== category && (
                      <span className="float-right text-muted-foreground">
                        {category === 'All' 
                          ? deals.length 
                          : deals.filter(d => d.category === category).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-card rounded-xl p-4 shadow-card">
              <span className="text-sm text-muted-foreground">
                Showing {filteredDeals.length} deals
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-secondary rounded-lg px-3 py-2 text-sm text-foreground border-none outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>

            {filteredDeals.length === 0 && (
              <div className="text-center py-12 bg-card rounded-xl shadow-card">
                <p className="text-muted-foreground">No deals found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
