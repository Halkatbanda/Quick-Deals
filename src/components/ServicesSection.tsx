import { 
  CheckSquare, 
  Database, 
  Settings, 
  Mail, 
  Users, 
  Share2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: CheckSquare,
    title: 'Review Management',
    description: 'Build credibility through verified customer feedback and authentic product reviews.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: Database,
    title: 'Analytics & Insights',
    description: 'Track your brand performance with real-time data dashboards and actionable insights.',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    icon: Settings,
    title: 'Campaign Automation',
    description: 'Streamline your influencer outreach with smart scheduling and automated follow-ups.',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    icon: Mail,
    title: 'Creator Outreach',
    description: 'Connect with vetted creators who align with your brand values and target audience.',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/10 to-amber-500/10',
  },
  {
    icon: Users,
    title: 'Influencer Partnerships',
    description: 'Access our network of trusted micro and nano influencers for genuine product endorsements.',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-500/10 to-rose-500/10',
  },
  {
    icon: Share2,
    title: 'Performance Marketing',
    description: 'Drive measurable results with conversion-focused campaigns and transparent ROI tracking.',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' as const, stiffness: 200, delay: 0.2 }}
          >
            Our Services
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything you need to scale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From finding the right creators to managing campaigns, we provide end-to-end solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8 h-full transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="text-primary text-lg">→</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;