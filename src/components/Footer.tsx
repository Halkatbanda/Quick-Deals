import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DealsPro</span>
            </div>
            <p className="text-background/70 text-sm mb-4">
              Connecting brands with the right audience. Your trusted partner for online reputation management in India.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/services" className="hover:text-background transition-colors">Reputation Management</Link></li>
              <li><Link to="/services" className="hover:text-background transition-colors">Influencer Marketing</Link></li>
              <li><Link to="/services" className="hover:text-background transition-colors">Affiliate Marketing</Link></li>
              <li><Link to="/services" className="hover:text-background transition-colors">Email Marketing</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-background transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-background transition-colors">Deals</Link></li>
              <li><Link to="/testimonials" className="hover:text-background transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@dealspro.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} DealsPro™. All rights reserved.</p>
          <p className="mt-2">
            Technology-driven Online Reputation Management Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
