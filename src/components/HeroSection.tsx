import { ArrowRight, Video, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Announcement Banner */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/about" 
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border hover:border-primary/50 transition-all duration-300"
          >
            <motion.span 
              className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3" /> New
            </motion.span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Discover how we help brands grow with authentic reviews</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Grow your brand with{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                authentic voices.
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              We bridge the gap between emerging brands and trusted content creators to build genuine customer trust and drive sales.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="btn-primary h-12 px-6 gap-2">
                    Brand
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/referral">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="h-12 px-6 gap-2 border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300">
                    <Video className="w-4 h-4" />
                    <span>Blogger/Influencer</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['VM', 'SR', 'KJ'].map((initials, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      {initials}
                    </motion.div>
                  ))}
                </div>
                <span>500+ brands trust us</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration - Redesigned */}
          <motion.div 
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Main card stack */}
              <motion.div
                className="relative"
                animate={floatingAnimation}
              >
                {/* Background cards */}
                <motion.div
                  className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-3xl"
                  animate={{ rotate: [-3, -5, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -top-2 -left-2 w-full h-full bg-primary/10 rounded-3xl"
                  animate={{ rotate: [2, 4, 2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Main card */}
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                  {/* Chart visualization */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">Review Growth</span>
                      <motion.span 
                        className="text-sm font-bold text-success"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        +147%
                      </motion.span>
                    </div>
                    <div className="flex items-end gap-2 h-32">
                      {[40, 55, 45, 70, 60, 85, 95].map((height, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-primary/20 rounded-t-lg relative overflow-hidden"
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        >
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {[
                      { label: 'Reviews', value: '12.5K' },
                      { label: 'Creators', value: '850+' },
                      { label: 'Rating', value: '4.8★' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                      >
                        <div className="text-xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-6 -right-6 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                ⭐ Top Rated
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-6 bg-card border border-border px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                animate={{ y: [0, 5, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🚀 Growing Fast
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
