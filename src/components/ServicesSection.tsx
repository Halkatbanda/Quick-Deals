import { 
  CheckSquare, 
  Database, 
  Settings, 
  Mail, 
  Users, 
  Share2 
} from 'lucide-react';

const services = [
  {
    icon: CheckSquare,
    title: 'Review Management',
    description: 'Build credibility through verified customer feedback and authentic product reviews.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Database,
    title: 'Analytics & Insights',
    description: 'Track your brand performance with real-time data dashboards and actionable insights.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Settings,
    title: 'Campaign Automation',
    description: 'Streamline your influencer outreach with smart scheduling and automated follow-ups.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Mail,
    title: 'Creator Outreach',
    description: 'Connect with vetted creators who align with your brand values and target audience.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Users,
    title: 'Influencer Partnerships',
    description: 'Access our network of trusted micro and nano influencers for genuine product endorsements.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Share2,
    title: 'Performance Marketing',
    description: 'Drive measurable results with conversion-focused campaigns and transparent ROI tracking.',
    color: 'bg-cyan-50 text-cyan-600',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to scale your brand
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From finding the right creators to managing campaigns, we provide end-to-end solutions that turn product mentions into lasting customer relationships.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
