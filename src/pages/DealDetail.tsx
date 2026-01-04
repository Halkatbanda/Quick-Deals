import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { getDealBySlug, type Deal } from '@/lib/dealsStore';
import { ArrowLeft, ExternalLink, Share2, Heart, Clock, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DealDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundDeal = getDealBySlug(slug);
      setDeal(foundDeal || null);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-secondary rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-secondary rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-secondary rounded w-24"></div>
                <div className="h-10 bg-secondary rounded w-full"></div>
                <div className="h-20 bg-secondary rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!deal) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Deal Not Found</h1>
          <p className="text-muted-foreground mb-8">The deal you're looking for doesn't exist or has expired.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discount = Math.round(((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100);
  const savings = deal.originalPrice - deal.currentPrice;

  const storeNames = {
    amazon: 'Amazon',
    flipkart: 'Flipkart',
    other: 'Store',
  };

  const handleBuyNow = () => {
    // Redirect to the actual product URL
    window.open(deal.productUrl, '_blank');
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: deal.title,
          text: `Check out this deal: ${deal.title} - ₹${deal.currentPrice}`,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-foreground transition-colors">Deals</Link>
          <span>/</span>
          <span className="text-foreground">{deal.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden">
              <img
                src={deal.imageUrl}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 badge-savings text-base px-4 py-2">
              {discount}% OFF
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Store Badge */}
            <div className="flex items-center gap-3">
              <span className="badge-store">{storeNames[deal.store]}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Posted {deal.createdAt.toLocaleDateString()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {deal.title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground">
              {deal.description}
            </p>

            {/* Pricing */}
            <div className="bg-secondary/50 rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-foreground">₹{deal.currentPrice.toLocaleString()}</span>
                <span className="text-xl text-muted-foreground line-through">₹{deal.originalPrice.toLocaleString()}</span>
              </div>
              <div className="text-success font-semibold text-lg">
                You save ₹{savings.toLocaleString()} ({discount}% off)
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Deal Highlights</h3>
              <ul className="space-y-2">
                {[
                  'Verified deal with genuine discount',
                  'Limited time offer - may expire soon',
                  'Free delivery may be available',
                  'Easy returns & refunds on the store',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleBuyNow}
                className="flex-1 btn-primary h-14 text-lg gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now on {storeNames[deal.store]}
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> Product prices and availability are accurate as of the date/time listed and are subject to change. 
              Any price and availability information displayed at the time of purchase will apply.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DealDetail;
