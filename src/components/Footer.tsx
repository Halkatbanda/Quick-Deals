import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/95" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <motion.div
          className="py-12 md:py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <motion.div className="col-span-1 sm:col-span-2 lg:col-span-1" variants={itemVariants}>
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <span className="text-xl font-bold group-hover:text-primary transition-colors">DealsPro</span>
              </Link>
              <p className="text-background/70 text-sm mb-6 leading-relaxed">
                Helping brands grow through authentic creator partnerships and verified customer feedback.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4 text-lg">Services</h3>
              <ul className="space-y-3 text-sm text-background/70">
                {[
                  { name: 'Reputation Management', path: '/services' },
                  { name: 'Influencer Marketing', path: '/services' },
                  { name: 'Affiliate Marketing', path: '/services' },
                  { name: 'Email Marketing', path: '/services' },
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-sm text-background/70">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'Testimonials', path: '/testimonials' },
                  { name: 'Contact Us', path: '/contact' },
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
              <ul className="space-y-4 text-sm text-background/70">
                {[
                  { icon: Mail, text: 'support@dealspro.com' },
                  { icon: Phone, text: '+91 98765 43210' },
                  { icon: MapPin, text: 'Mumbai, India' },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="group-hover:text-background transition-colors">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-background/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-background/50 text-center sm:text-left">
            © {currentYear} DealsPro™. All rights reserved.
          </p>
          <p className="text-sm text-background/50 text-center sm:text-right">
            Building brand trust through authentic partnerships
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;