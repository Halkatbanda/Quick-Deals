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
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  getDeals, 
  addDeal, 
  deleteDeal, 
  updateDeal,
  getCategories,
  type Deal 
} from '@/lib/dealsStore';
import { toast } from 'sonner';

const Admin = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
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
  }, []);

  const loadDeals = () => {
    setDeals(getDeals());
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
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
            <Package className="w-5 h-5" />
            All Deals
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </a>
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
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your deals and generate URLs</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Add New Deal
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Total Deals</p>
            <p className="text-3xl font-bold text-foreground">{deals.length}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Active Deals</p>
            <p className="text-3xl font-bold text-success">{deals.filter(d => d.isActive).length}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-muted-foreground text-sm">Categories</p>
            <p className="text-3xl font-bold text-primary">{categories.length}</p>
          </div>
        </div>

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
      </main>
    </div>
  );
};

export default Admin;
