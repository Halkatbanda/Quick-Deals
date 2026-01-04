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
  Users, 
  TrendingUp, 
  Gift, 
  CheckCircle,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';
import { z } from 'zod';

const referralSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  phone: z.string().trim().min(10, 'Enter valid phone number').max(15, 'Phone number too long'),
  instagram: z.string().trim().max(50, 'Handle too long').optional(),
  youtube: z.string().trim().max(100, 'Channel name too long').optional(),
  twitter: z.string().trim().max(50, 'Handle too long').optional(),
  niche: z.string().min(1, 'Please select a niche'),
  followers: z.string().min(1, 'Please select follower range'),
  about: z.string().trim().max(500, 'About section too long').optional(),
});

const niches = [
  'Tech & Gadgets',
  'Fashion & Lifestyle',
  'Beauty & Skincare',
  'Food & Cooking',
  'Fitness & Health',
  'Travel & Adventure',
  'Home & Decor',
  'Parenting & Kids',
  'Gaming',
  'Finance & Business',
  'Other',
];

const followerRanges = [
  '1K - 5K',
  '5K - 10K',
  '10K - 50K',
  '50K - 100K',
  '100K - 500K',
  '500K+',
];

const benefits = [
  {
    icon: Gift,
    title: 'Free Products',
    description: 'Get free products from top brands to review and keep.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Audience',
    description: 'Collaborate with brands and expand your reach.',
  },
  {
    icon: Users,
    title: 'Exclusive Community',
    description: 'Join our network of 5000+ influencers across India.',
  },
];

const Referral = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    instagram: '',
    youtube: '',
    twitter: '',
    niche: '',
    followers: '',
    about: '',
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
      const validatedData = referralSchema.parse(formData);
      
      // Store in localStorage for now (would be sent to backend later)
      const referrals = JSON.parse(localStorage.getItem('influencer_referrals') || '[]');
      referrals.push({
        ...validatedData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      localStorage.setItem('influencer_referrals', JSON.stringify(referrals));

      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        instagram: '',
        youtube: '',
        twitter: '',
        niche: '',
        followers: '',
        about: '',
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
              <Users className="w-4 h-4" />
              Join 5000+ Influencers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Become a <span className="gradient-text">Brand Partner</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in">
              Connect with top brands, get free products, and earn while doing what you love. Join our exclusive network of influencers and bloggers.
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

      {/* Registration Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Register as Influencer</h2>
              <p className="text-muted-foreground mb-8">Fill in your details and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
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

                {/* Social Media */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Social Media Handles</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        placeholder="@username"
                        value={formData.instagram}
                        onChange={(e) => handleChange('instagram', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="youtube" className="flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-red-500" />
                        YouTube
                      </Label>
                      <Input
                        id="youtube"
                        placeholder="Channel name"
                        value={formData.youtube}
                        onChange={(e) => handleChange('youtube', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="flex items-center gap-2">
                        <Twitter className="w-4 h-4 text-blue-400" />
                        Twitter/X
                      </Label>
                      <Input
                        id="twitter"
                        placeholder="@username"
                        value={formData.twitter}
                        onChange={(e) => handleChange('twitter', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Niche & Followers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Content Niche *</Label>
                    <Select value={formData.niche} onValueChange={(value) => handleChange('niche', value)}>
                      <SelectTrigger className={errors.niche ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select your niche" />
                      </SelectTrigger>
                      <SelectContent>
                        {niches.map((niche) => (
                          <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.niche && <p className="text-xs text-destructive">{errors.niche}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Total Followers *</Label>
                    <Select value={formData.followers} onValueChange={(value) => handleChange('followers', value)}>
                      <SelectTrigger className={errors.followers ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select follower range" />
                      </SelectTrigger>
                      <SelectContent>
                        {followerRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.followers && <p className="text-xs text-destructive">{errors.followers}</p>}
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <Label htmlFor="about">About You (Optional)</Label>
                  <Textarea
                    id="about"
                    placeholder="Tell us about your content, audience, and why you'd be a great brand partner..."
                    value={formData.about}
                    onChange={(e) => handleChange('about', e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our terms and conditions. We'll review your application and contact you within 24-48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Apply', desc: 'Fill out the registration form with your details' },
              { step: '02', title: 'Get Approved', desc: 'Our team reviews and approves your profile' },
              { step: '03', title: 'Choose Campaigns', desc: 'Browse and apply for brand campaigns' },
              { step: '04', title: 'Earn Rewards', desc: 'Complete tasks and get paid or keep products' },
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

export default Referral;
