import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit, 
  ExternalLink, 
  Copy, 
  ShoppingBag,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  LayoutGrid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  getDeals, 
  addDeal, 
  deleteDeal, 
  updateDeal,
  getCategories,
  type Deal 
} from '@/lib/dealsStore';
import { toast } from 'sonner';
import BrandProfileCard from '@/components/BrandProfileCard';

interface InfluencerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  niche: string;
  followers: string;
  about?: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

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

const Admin = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [activeTab, setActiveTab] = useState<'deals' | 'influencers' | 'brands'>('deals');
  const [influencers, setInfluencers] = useState<InfluencerApplication[]>([]);
  const [brandSubmissions, setBrandSubmissions] = useState<BrandSubmission[]>([]);
  const [selectedItem, setSelectedItem] = useState<InfluencerApplication | BrandSubmission | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    currentPrice: '',
    originalPrice: '',
    store: 'amazon' as 'amazon' | 'flipkart' | 'other',
    category: 'Electronics',
    productUrl: '',
  });

  useEffect(() => {
    loadDeals();
    loadInfluencers();
    loadBrandSubmissions();
  }, []);

  const loadDeals = () => {
    setDeals(getDeals());
  };

  const loadInfluencers = () => {
    const stored = localStorage.getItem('influencer_referrals');
    if (stored) {
      setInfluencers(JSON.parse(stored));
    }
  };

  const loadBrandSubmissions = () => {
    const stored = localStorage.getItem('brand_submissions');
    if (stored) {
      setBrandSubmissions(JSON.parse(stored));
    }
  };

  const updateInfluencerStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = influencers.map(inf => 
      inf.id === id ? { ...inf, status } : inf
    );
    setInfluencers(updated);
    localStorage.setItem('influencer_referrals', JSON.stringify(updated));
    toast.success(`Influencer ${status === 'approved' ? 'approved' : 'rejected'}`);
  };

  const updateBrandStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = brandSubmissions.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    );
    setBrandSubmissions(updated);
    localStorage.setItem('brand_submissions', JSON.stringify(updated));
    toast.success(`Brand submission ${status === 'approved' ? 'approved' : 'rejected'}`);
  };

  const deleteInfluencer = (id: string) => {
    if (confirm('Delete this application?')) {
      const updated = influencers.filter(inf => inf.id !== id);
      setInfluencers(updated);
      localStorage.setItem('influencer_referrals', JSON.stringify(updated));
      toast.success('Application deleted');
    }
  };

  const deleteBrandSubmission = (id: string) => {
    if (confirm('Delete this submission?')) {
      const updated = brandSubmissions.filter(sub => sub.id !== id);
      setBrandSubmissions(updated);
      localStorage.setItem('brand_submissions', JSON.stringify(updated));
      toast.success('Submission deleted');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      currentPrice: '',
      originalPrice: '',
      store: 'amazon',
      category: 'Electronics',
      productUrl: '',
    });
    setEditingDeal(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productUrl.startsWith('http')) {
      toast.error('Please enter a valid product URL');
      return;
    }

    const dealData = {
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      currentPrice: parseFloat(formData.currentPrice),
      originalPrice: parseFloat(formData.originalPrice),
      store: formData.store,
      category: formData.category,
      productUrl: formData.productUrl,
      isActive: true,
    };

    if (editingDeal) {
      updateDeal(editingDeal.id, dealData);
      toast.success('Deal updated successfully!');
    } else {
      const newDeal = addDeal(dealData);
      toast.success('Deal created successfully!');
      
      // Copy the deal URL to clipboard
      const dealUrl = `${window.location.origin}/deal/${newDeal.slug}`;
      navigator.clipboard.writeText(dealUrl);
      toast.info('Deal URL copied to clipboard!');
    }

    loadDeals();
    resetForm();
  };

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title,
      description: deal.description,
      imageUrl: deal.imageUrl,
      currentPrice: deal.currentPrice.toString(),
      originalPrice: deal.originalPrice.toString(),
      store: deal.store,
      category: deal.category,
      productUrl: deal.productUrl,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      deleteDeal(id);
      loadDeals();
      toast.success('Deal deleted successfully!');
    }
  };

  const copyDealUrl = (deal: Deal) => {
    const url = `${window.location.origin}/deal/${deal.slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Deal URL copied to clipboard!');
  };

  const categories = getCategories();

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">DealsPro</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('deals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'deals' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <Package className="w-5 h-5" />
            Deals
          </button>
          <button 
            onClick={() => setActiveTab('influencers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'influencers' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <Users className="w-5 h-5" />
            Influencers
            {influencers.filter(i => i.status === 'pending').length > 0 && (
              <Badge variant="destructive" className="ml-auto">{influencers.filter(i => i.status === 'pending').length}</Badge>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('brands')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'brands' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <Building2 className="w-5 h-5" />
            Brand Submissions
            {brandSubmissions.filter(b => b.status === 'pending').length > 0 && (
              <Badge variant="destructive" className="ml-auto">{brandSubmissions.filter(b => b.status === 'pending').length}</Badge>
            )}
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/">
            <Button variant="outline" className="w-full gap-2">
              <ExternalLink className="w-4 h-4" />
              View Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {activeTab === 'deals' && 'Manage Deals'}
              {activeTab === 'influencers' && 'Influencer Applications'}
              {activeTab === 'brands' && 'Brand Submissions'}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === 'deals' && 'Create and manage your deals'}
              {activeTab === 'influencers' && 'Review and approve influencer applications'}
              {activeTab === 'brands' && 'Review product submission requests from brands'}
            </p>
          </div>
          {activeTab === 'deals' && (
            <Button onClick={() => setShowForm(true)} className="btn-primary gap-2">
              <Plus className="w-4 h-4" />
              Add New Deal
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Total Deals</p>
            <p className="text-3xl font-bold text-foreground">{deals.length}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Active Deals</p>
            <p className="text-3xl font-bold text-success">{deals.filter(d => d.isActive).length}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Influencer Applications</p>
            <p className="text-3xl font-bold text-primary">{influencers.length}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Brand Submissions</p>
            <p className="text-3xl font-bold text-primary">{brandSubmissions.length}</p>
          </div>
        </div>

        {/* Deals Tab */}
        {activeTab === 'deals' && (
          <>
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-card rounded-xl p-6 shadow-card mb-8 animate-slide-up">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              {editingDeal ? 'Edit Deal' : 'Add New Deal'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Product URL *
                  </label>
                  <Input
                    value={formData.productUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}
                    placeholder="https://www.amazon.in/product..."
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Paste Amazon, Flipkart, or any product link
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Store *
                  </label>
                  <select
                    value={formData.store}
                    onChange={(e) => setFormData(prev => ({ ...prev, store: e.target.value as any }))}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-foreground"
                    required
                  >
                    <option value="amazon">Amazon</option>
                    <option value="flipkart">Flipkart</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief product description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image URL
                </label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Price (₹) *
                  </label>
                  <Input
                    type="number"
                    value={formData.currentPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentPrice: e.target.value }))}
                    placeholder="999"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Original Price (₹) *
                  </label>
                  <Input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="1999"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-foreground"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="btn-primary">
                  {editingDeal ? 'Update Deal' : 'Create Deal & Copy URL'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Deals Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Store</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={deal.imageUrl}
                          alt={deal.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{deal.title}</p>
                          <p className="text-xs text-muted-foreground">/{deal.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">₹{deal.currentPrice.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground line-through">₹{deal.originalPrice.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge-store capitalize">{deal.store}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{deal.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyDealUrl(deal)}
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Link to={`/deal/${deal.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" title="View">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(deal)}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(deal.id)}
                          className="text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {deals.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No deals yet. Add your first deal!</p>
            </div>
          )}
        </div>
          </>
        )}

        {/* Influencers Tab */}
        {activeTab === 'influencers' && (
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Influencer</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Niche</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Followers</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {influencers.map((inf) => (
                    <tr key={inf.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{inf.fullName}</p>
                          <p className="text-xs text-muted-foreground">{inf.email}</p>
                          <p className="text-xs text-muted-foreground">{inf.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{inf.niche}</td>
                      <td className="px-6 py-4 text-muted-foreground">{inf.followers}</td>
                      <td className="px-6 py-4">
                        <Badge variant={inf.status === 'approved' ? 'default' : inf.status === 'rejected' ? 'destructive' : 'secondary'}>
                          {inf.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {inf.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {inf.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {inf.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedItem(inf)} title="View Details">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {inf.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="icon" onClick={() => updateInfluencerStatus(inf.id, 'approved')} title="Approve" className="text-success hover:text-success">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => updateInfluencerStatus(inf.id, 'rejected')} title="Reject" className="text-destructive hover:text-destructive">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => deleteInfluencer(inf.id)} className="text-destructive hover:text-destructive" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {influencers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No influencer applications yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Brands Tab - Profile Cards View */}
        {activeTab === 'brands' && (
          <>
            {brandSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {brandSubmissions.map((brand) => (
                  <BrandProfileCard
                    key={brand.id}
                    brand={brand}
                    onApprove={(id) => updateBrandStatus(id, 'approved')}
                    onReject={(id) => updateBrandStatus(id, 'rejected')}
                    onDelete={deleteBrandSubmission}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-card p-12 text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No brand submissions yet</h3>
                <p className="text-muted-foreground">Brand submissions will appear here as profile cards.</p>
              </div>
            )}
          </>
        )}

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
            <div className="bg-card rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {'fullName' in selectedItem ? (
                <>
                  <h3 className="text-xl font-bold mb-4">Influencer Details</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Name:</strong> {selectedItem.fullName}</p>
                    <p><strong>Email:</strong> {selectedItem.email}</p>
                    <p><strong>Phone:</strong> {selectedItem.phone}</p>
                    <p><strong>Niche:</strong> {selectedItem.niche}</p>
                    <p><strong>Followers:</strong> {selectedItem.followers}</p>
                    {selectedItem.instagram && <p><strong>Instagram:</strong> @{selectedItem.instagram}</p>}
                    {selectedItem.youtube && <p><strong>YouTube:</strong> {selectedItem.youtube}</p>}
                    {selectedItem.twitter && <p><strong>Twitter:</strong> @{selectedItem.twitter}</p>}
                    {selectedItem.about && <p><strong>About:</strong> {selectedItem.about}</p>}
                    <p><strong>Applied:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4">Brand Submission Details</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Company:</strong> {selectedItem.companyName}</p>
                    <p><strong>Contact:</strong> {selectedItem.contactName}</p>
                    <p><strong>Email:</strong> {selectedItem.email}</p>
                    <p><strong>Phone:</strong> {selectedItem.phone}</p>
                    {selectedItem.website && <p><strong>Website:</strong> {selectedItem.website}</p>}
                    <p><strong>Product:</strong> {selectedItem.productName}</p>
                    <p><strong>Category:</strong> {selectedItem.productCategory}</p>
                    <p><strong>Price:</strong> ₹{selectedItem.productPrice}</p>
                    <p><strong>Review Type:</strong> {selectedItem.reviewType}</p>
                    <p><strong>Budget:</strong> {selectedItem.budget}</p>
                    <p><strong>Description:</strong> {selectedItem.productDescription}</p>
                    {selectedItem.additionalInfo && <p><strong>Additional Info:</strong> {selectedItem.additionalInfo}</p>}
                    <p><strong>Submitted:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                  </div>
                </>
              )}
              <Button className="w-full mt-6" onClick={() => setSelectedItem(null)}>Close</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
