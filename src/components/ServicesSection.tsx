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
    title: 'Online reputation management',
    description: 'Enhancing and maintaining a healthy brand reputation on online marketplace.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Database,
    title: 'Web scraping',
    description: 'Crafting tailored bots for your data needs, including Brand Monitoring solutions.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Settings,
    title: 'Business automation',
    description: 'Auto-assign tasks, send whatsapp messages, and much more. Power up with hundreds of new business tasks.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email marketing',
    description: 'Engage your audience seamlessly and affordably in real-time interactions.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Users,
    title: 'Micro Influencer marketing',
    description: 'Unlock the Power of Micro-Influencers: Amplify Your Reach with Our Magic Touch!',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Share2,
    title: 'Affiliate marketing',
    description: 'Empower Your Business: Partner with Us for Profitable Affiliate Marketing Solutions!',
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
            Designed for business teams like yours
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here at DealsPro™ we focus on services where technology, innovation, and capital can unlock long-term value and drive economic growth.
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
