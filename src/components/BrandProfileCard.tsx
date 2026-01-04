import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Package, 
  Tag, 
  IndianRupee,
  Calendar,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BrandSubmission {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  productName: string;
  productCategory: string;
  productPrice: string;
  productUrl: string;
  productDescription: string;
  reviewType: string;
  budget: string;
  additionalInfo?: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface BrandProfileCardProps {
  brand: BrandSubmission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

const BrandProfileCard = ({ brand, onApprove, onReject, onDelete }: BrandProfileCardProps) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Clock },
    approved: { color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: CheckCircle },
    rejected: { color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: XCircle },
  };

  const StatusIcon = statusConfig[brand.status].icon;

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 group">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 relative">
        <div className="absolute top-4 right-4">
          <Badge className={`${statusConfig[brand.status].color} border capitalize gap-1`}>
            <StatusIcon className="w-3 h-3" />
            {brand.status}
          </Badge>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate">{brand.companyName}</h3>
            <p className="text-sm text-muted-foreground">{brand.contactName}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(brand.createdAt).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Product Details</span>
        </div>
        <h4 className="font-medium text-foreground mb-2">{brand.productName}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{brand.productDescription}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <Tag className="w-3 h-3" />
            {brand.productCategory}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <IndianRupee className="w-3 h-3" />
            {brand.productPrice}
          </Badge>
          <Badge variant="outline">{brand.reviewType}</Badge>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-6 space-y-3">
        <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="w-4 h-4 text-primary" />
          <span className="truncate">{brand.email}</span>
        </a>
        <a href={`tel:${brand.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Phone className="w-4 h-4 text-primary" />
          <span>{brand.phone}</span>
        </a>
        {brand.website && (
          <a href={brand.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Globe className="w-4 h-4 text-primary" />
            <span className="truncate">{brand.website}</span>
          </a>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border mt-4">
          <span className="text-sm font-medium text-muted-foreground">Budget</span>
          <span className="text-sm font-bold text-primary">{brand.budget}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-secondary/30 flex items-center gap-2">
        <a href={brand.productUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <ExternalLink className="w-4 h-4" />
            View Product
          </Button>
        </a>
        
        {brand.status === 'pending' && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onApprove(brand.id)} 
              className="text-green-600 hover:text-green-700 hover:bg-green-500/10"
              title="Approve"
            >
              <CheckCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onReject(brand.id)} 
              className="text-red-600 hover:text-red-700 hover:bg-red-500/10"
              title="Reject"
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(brand.id)} 
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default BrandProfileCard;
