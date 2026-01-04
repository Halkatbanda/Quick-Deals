import Layout from '@/components/Layout';
import { getDeals } from '@/lib/dealsStore';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Stores = () => {
  const deals = getDeals().filter(d => d.isActive);
  
  const stores = [
    {
      id: 'amazon',
      name: 'Amazon',
      logo: '🛒',
      description: 'Shop millions of products with fast delivery',
      color: 'bg-orange-100 text-orange-700',
      dealCount: deals.filter(d => d.store === 'amazon').length,
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      logo: '🛍️',
      description: 'India\'s leading e-commerce marketplace',
      color: 'bg-blue-100 text-blue-700',
      dealCount: deals.filter(d => d.store === 'flipkart').length,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Partner Stores</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with the best online stores to bring you verified deals and maximum savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl ${store.color} flex items-center justify-center text-3xl`}>
                  {store.logo}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{store.name}</h2>
                  <p className="text-muted-foreground text-sm">{store.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-2xl font-bold text-primary">{store.dealCount}</span>
                  <span className="text-muted-foreground ml-2">active deals</span>
                </div>
                <Link
                  to={`/categories?store=${store.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  View Deals
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Stores;
