import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Vikram Mehta',
    company: 'GreenLeaf Organics',
    avatar: 'VM',
    rating: 5,
    text: 'Working with their creator network helped us reach health-conscious customers authentically. Our organic traffic doubled!',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Sneha Reddy',
    company: 'Urban Style Co',
    avatar: 'SR',
    rating: 5,
    text: 'The quality of influencer matches was impressive. We found creators who genuinely loved our products.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Karan Joshi',
    company: 'TechWare Solutions',
    avatar: 'KJ',
    rating: 5,
    text: 'Transparent reporting and real results. Our product reviews went from sparse to substantial in weeks.',
    gradient: 'from-blue-500 to-indigo-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

const ClientsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-accent/20 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

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
            className="inline-block px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' as const, stiffness: 200, delay: 0.2 }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What our partners say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from brands who have grown with us and transformed their online presence.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl relative overflow-hidden">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-8 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;