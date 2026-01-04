import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag } from 'lucide-react';

const brands = [
  {
    name: 'TechGear Pro',
    logo: 'TG',
    category: 'Electronics',
    partnerSince: '2024',
    storeLink: 'https://www.amazon.in',
    store: 'amazon',
    color: 'from-orange-500 to-amber-500',
  },
  {
    name: 'FreshFit Foods',
    logo: 'FF',
    category: 'Health & Wellness',
    partnerSince: '2023',
    storeLink: 'https://www.flipkart.com',
    store: 'flipkart',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'StyleVerse',
    logo: 'SV',
    category: 'Fashion',
    partnerSince: '2024',
    storeLink: 'https://www.amazon.in',
    store: 'amazon',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'HomeNest',
    logo: 'HN',
    category: 'Home & Kitchen',
    partnerSince: '2023',
    storeLink: 'https://www.flipkart.com',
    store: 'flipkart',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'GadgetHub',
    logo: 'GH',
    category: 'Mobile Accessories',
    partnerSince: '2024',
    storeLink: 'https://www.amazon.in',
    store: 'amazon',
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: 'PureGlow',
    logo: 'PG',
    category: 'Beauty & Personal Care',
    partnerSince: '2023',
    storeLink: 'https://www.flipkart.com',
    store: 'flipkart',
    color: 'from-cyan-500 to-sky-500',
  },
  {
    name: 'FitLife Gear',
    logo: 'FL',
    category: 'Sports & Fitness',
    partnerSince: '2024',
    storeLink: 'https://www.amazon.in',
    store: 'amazon',
    color: 'from-lime-500 to-green-500',
  },
  {
    name: 'KidZone',
    logo: 'KZ',
    category: 'Baby & Kids',
    partnerSince: '2023',
    storeLink: 'https://www.flipkart.com',
    store: 'flipkart',
    color: 'from-yellow-500 to-orange-500',
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

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const BrandsShowcase = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
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
            Trusted Partners
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Brands that grow with us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 50+ brands leveraging authentic reviews to build trust and drive sales on Amazon & Flipkart
          </p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {brands.map((brand, index) => (
            <motion.a
              key={index}
              href={brand.storeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30 overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                />

                {/* Logo */}
                <div className="relative mb-4">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white font-bold text-xl">{brand.logo}</span>
                  </motion.div>
                  
                  {/* Store badge */}
                  <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    brand.store === 'amazon' 
                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {brand.store === 'amazon' ? 'Amazon' : 'Flipkart'}
                  </div>
                </div>

                {/* Brand Info */}
                <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{brand.category}</p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Since {brand.partnerSince}</span>
                  <motion.span
                    className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 3 }}
                  >
                    View Store <ExternalLink className="w-3 h-3" />
                  </motion.span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>50+ more partners</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
