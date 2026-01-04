import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import DealCard from '@/components/DealCard';
import { searchDeals, type Deal } from '@/lib/dealsStore';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Deal[]>([]);

  useEffect(() => {
    if (initialQuery) {
      const found = searchDeals(initialQuery);
      setResults(found);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const found = searchDeals(query);
      setResults(found);
      window.history.replaceState(null, '', `/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-foreground text-center mb-6">Search Deals</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14"
              />
            </div>
            <Button type="submit" className="btn-primary h-14 px-8">
              Search
            </Button>
          </form>
        </div>

        {/* Results */}
        {initialQuery && (
          <div>
            <p className="text-muted-foreground mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{initialQuery}"
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl shadow-card">
                <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No deals found</h3>
                <p className="text-muted-foreground">Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
