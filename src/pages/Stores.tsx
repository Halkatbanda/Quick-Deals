import Layout from '@/components/Layout';
import { ExternalLink, Users, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const partners = [
  {
    id: 'amazon',
    name: 'Amazon India',
    logo: '🛒',
    description: 'India\'s largest e-commerce platform with millions of products',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    stats: { brands: '200+', reviews: '25K+' },
    link: 'https://www.amazon.in',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: '🛍️',
    description: 'India\'s leading homegrown e-commerce marketplace',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    stats: { brands: '150+', reviews: '20K+' },
    link: 'https://www.flipkart.com',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const Stores = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' as const, stiffness: 200, delay: 0.2 }}
          >
            Our Partners
          </motion.span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Marketplace Partners
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We collaborate with India's top e-commerce platforms to deliver authentic reviews and build brand trust.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {partners.map((partner) => (
            <motion.a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-3xl shadow-lg`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {partner.logo}
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {partner.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">{partner.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`${partner.bgColor} rounded-xl p-4 text-center`}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-xl font-bold text-foreground">{partner.stats.brands}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Brands Served</span>
                  </div>
                  <div className={`${partner.bgColor} rounded-xl p-4 text-center`}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-xl font-bold text-foreground">{partner.stats.reviews}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Reviews Generated</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span>Active Partnership</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit Store
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-secondary/50 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Want to partner with us?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join our network and reach thousands of authentic reviewers and content creators.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Stores;