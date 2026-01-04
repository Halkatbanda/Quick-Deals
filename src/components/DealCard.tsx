import { Link } from 'react-router-dom';
import { ExternalLink, Clock } from 'lucide-react';
import type { Deal } from '@/lib/dealsStore';

interface DealCardProps {
  deal: Deal;
}

const DealCard = ({ deal }: DealCardProps) => {
  const discount = Math.round(((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100);
  const savings = deal.originalPrice - deal.currentPrice;

  const storeColors = {
    amazon: 'bg-orange-100 text-orange-700',
    flipkart: 'bg-blue-100 text-blue-700',
    other: 'bg-gray-100 text-gray-700',
  };

  const storeNames = {
    amazon: 'Amazon',
    flipkart: 'Flipkart',
    other: 'Other',
  };

  return (
    <Link to={`/deal/${deal.slug}`} className="block">
      <div className="card-deal group">
        {/* Image Container */}
        <div className="relative aspect-square bg-secondary/30 overflow-hidden">
          <img
            src={deal.imageUrl}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 badge-savings">
            {discount}% OFF
          </div>
          {/* Store Badge */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${storeColors[deal.store]}`}>
            {storeNames[deal.store]}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {deal.category}
          </span>

          {/* Title */}
          <h3 className="mt-1 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {deal.title}
          </h3>

          {/* Pricing */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="price-current">₹{deal.currentPrice.toLocaleString()}</span>
            <span className="price-original">₹{deal.originalPrice.toLocaleString()}</span>
          </div>

          {/* Savings */}
          <div className="mt-2 text-sm text-success font-medium">
            Save ₹{savings.toLocaleString()}
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Limited Time</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <span>View Deal</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;
