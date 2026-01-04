import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Building2, 
  Star, 
  TrendingUp, 
  Shield,
  Package,
  Upload
} from 'lucide-react';
import { z } from 'zod';

const brandSchema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required').max(100, 'Name too long'),
  contactName: z.string().trim().min(2, 'Contact name is required').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  phone: z.string().trim().min(10, 'Enter valid phone number').max(15, 'Phone number too long'),
  website: z.string().trim().url('Invalid website URL').optional().or(z.literal('')),
  productName: z.string().trim().min(2, 'Product name is required').max(200, 'Name too long'),
  productCategory: z.string().min(1, 'Please select a category'),
  productPrice: z.string().min(1, 'Price is required'),
  productUrl: z.string().trim().url('Invalid product URL'),
  productDescription: z.string().trim().min(10, 'Description too short').max(1000, 'Description too long'),
  reviewType: z.string().min(1, 'Please select review type'),
  budget: z.string().min(1, 'Please select budget range'),
  additionalInfo: z.string().trim().max(500, 'Too long').optional(),
});

const categories = [
  'Electronics & Gadgets',
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Health & Fitness',
  'Food & Beverages',
  'Baby & Kids',
  'Sports & Outdoors',
  'Books & Stationery',
  'Automotive',
  'Other',
];

const reviewTypes = [
  'Product Review Video',
  'Unboxing & First Impressions',
  'Detailed Written Review',
  'Social Media Posts',
  'Full Campaign (Multiple Formats)',
];

const budgetRanges = [
  '₹5,000 - ₹15,000',
  '₹15,000 - ₹30,000',
  '₹30,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000+',
  'Product Barter Only',
];

const benefits = [
  {
    icon: Star,
    title: 'Authentic Reviews',
    description: 'Get genuine reviews from trusted influencers in your niche.',
  },
  {
    icon: TrendingUp,
    title: 'Boost Sales',
    description: 'Increase visibility and drive sales through influencer marketing.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'We vet all influencers to ensure quality content and reach.',
  },
];

const BrandOnboarding = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    productName: '',
    productCategory: '',
    productPrice: '',
    productUrl: '',
    productDescription: '',
    reviewType: '',
    budget: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = brandSchema.parse(formData);
      
      // Store in localStorage for now
      const submissions = JSON.parse(localStorage.getItem('brand_submissions') || '[]');
      submissions.push({
        ...validatedData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      localStorage.setItem('brand_submissions', JSON.stringify(submissions));

      toast.success('Product submitted successfully! Our team will review and contact you soon.');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        productName: '',
        productCategory: '',
        productPrice: '',
        productUrl: '',
        productDescription: '',
        reviewType: '',
        budget: '',
        additionalInfo: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please fix the errors in the form');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              For Brands & Sellers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Get Your Product <span className="gradient-text">Reviewed</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in">
              Submit your product for authentic reviews and ratings from our network of 5000+ influencers. Boost visibility and build trust with genuine customer testimonials.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-background rounded-2xl p-6 text-center border border-border hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Submit Your Product</h2>
              </div>
              <p className="text-muted-foreground mb-8">Fill in the details below and our team will match you with the right influencers.</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">Company Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company/Brand Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Your company name"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className={errors.companyName ? 'border-destructive' : ''}
                      />
                      {errors.companyName && <p className="text-xs text-destructive">{errors.companyName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person *</Label>
                      <Input
                        id="contactName"
                        placeholder="Your full name"
                        value={formData.contactName}
                        onChange={(e) => handleChange('contactName', e.target.value)}
                        className={errors.contactName ? 'border-destructive' : ''}
                      />
                      {errors.contactName && <p className="text-xs text-destructive">{errors.contactName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@company.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website (Optional)</Label>
                    <Input
                      id="website"
                      placeholder="https://yourcompany.com"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className={errors.website ? 'border-destructive' : ''}
                    />
                    {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">Product Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        placeholder="Product name"
                        value={formData.productName}
                        onChange={(e) => handleChange('productName', e.target.value)}
                        className={errors.productName ? 'border-destructive' : ''}
                      />
                      {errors.productName && <p className="text-xs text-destructive">{errors.productName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Product Category *</Label>
                      <Select value={formData.productCategory} onValueChange={(value) => handleChange('productCategory', value)}>
                        <SelectTrigger className={errors.productCategory ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.productCategory && <p className="text-xs text-destructive">{errors.productCategory}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Product Price (₹) *</Label>
                      <Input
                        id="productPrice"
                        placeholder="1999"
                        value={formData.productPrice}
                        onChange={(e) => handleChange('productPrice', e.target.value)}
                        className={errors.productPrice ? 'border-destructive' : ''}
                      />
                      {errors.productPrice && <p className="text-xs text-destructive">{errors.productPrice}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productUrl">Product URL *</Label>
                      <Input
                        id="productUrl"
                        placeholder="https://amazon.in/product..."
                        value={formData.productUrl}
                        onChange={(e) => handleChange('productUrl', e.target.value)}
                        className={errors.productUrl ? 'border-destructive' : ''}
                      />
                      {errors.productUrl && <p className="text-xs text-destructive">{errors.productUrl}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Product Description *</Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Describe your product, key features, and what makes it unique..."
                      value={formData.productDescription}
                      onChange={(e) => handleChange('productDescription', e.target.value)}
                      rows={4}
                      className={errors.productDescription ? 'border-destructive' : ''}
                    />
                    {errors.productDescription && <p className="text-xs text-destructive">{errors.productDescription}</p>}
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">Campaign Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type of Review *</Label>
                      <Select value={formData.reviewType} onValueChange={(value) => handleChange('reviewType', value)}>
                        <SelectTrigger className={errors.reviewType ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select review type" />
                        </SelectTrigger>
                        <SelectContent>
                          {reviewTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.reviewType && <p className="text-xs text-destructive">{errors.reviewType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Campaign Budget *</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
                        <SelectTrigger className={errors.budget ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Requirements (Optional)</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Any specific requirements, target audience, or preferences..."
                      value={formData.additionalInfo}
                      onChange={(e) => handleChange('additionalInfo', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  <Upload className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Product for Review'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our terms and conditions. Our team will review your submission and contact you within 24-48 hours to discuss next steps.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works for Brands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Submit Product', desc: 'Fill out the form with your product details' },
              { step: '02', title: 'We Match Influencers', desc: 'Our team finds the perfect influencers for your niche' },
              { step: '03', title: 'Review & Approve', desc: 'Review influencer profiles and approve the campaign' },
              { step: '04', title: 'Get Reviews', desc: 'Receive authentic reviews and boost your sales' },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrandOnboarding;
