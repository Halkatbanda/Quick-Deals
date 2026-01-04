import Layout from '@/components/Layout';
import { 
  CheckSquare, 
  Database, 
  Settings, 
  Mail, 
  Users, 
  Share2,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: CheckSquare,
    title: 'Online Reputation Management',
    description: 'Enhancing and maintaining a healthy brand reputation on online marketplace.',
    features: [
      'Product review management',
      'Rating optimization',
      'Negative review handling',
      'Brand monitoring & alerts',
      'Competitor analysis',
    ],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Database,
    title: 'Web Scraping',
    description: 'Crafting tailored bots for your data needs, including Brand Monitoring solutions.',
    features: [
      'Custom data extraction',
      'Price monitoring',
      'Product catalog scraping',
      'Market research data',
      'Real-time data feeds',
    ],
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Settings,
    title: 'Business Automation',
    description: 'Auto-assign tasks, send WhatsApp messages, and much more to streamline operations.',
    features: [
      'Workflow automation',
      'WhatsApp integration',
      'Email sequences',
      'Order management',
      'Inventory sync',
    ],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Engage your audience seamlessly and affordably in real-time interactions.',
    features: [
      'Campaign management',
      'List segmentation',
      'A/B testing',
      'Analytics & reporting',
      'Automated sequences',
    ],
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Users,
    title: 'Micro Influencer Marketing',
    description: 'Unlock the Power of Micro-Influencers: Amplify Your Reach with Our Magic Touch!',
    features: [
      'Influencer discovery',
      'Campaign management',
      'Content creation',
      'Performance tracking',
      'ROI measurement',
    ],
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Share2,
    title: 'Affiliate Marketing',
    description: 'Empower Your Business: Partner with Us for Profitable Affiliate Marketing Solutions!',
    features: [
      'Affiliate network setup',
      'Commission management',
      'Tracking & analytics',
      'Payment processing',
      'Partner recruitment',
    ],
    color: 'bg-cyan-50 text-cyan-600',
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Comprehensive solutions to boost your brand's online presence and drive business growth through technology and innovation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss how we can help you achieve your goals.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
