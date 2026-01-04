import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DealsPro</span>
            </div>
            <p className="text-background/70 text-sm">
              Your trusted destination for the best deals on Amazon, Flipkart, and more. Save money on every purchase!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-background transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-background transition-colors">Categories</Link></li>
              <li><Link to="/stores" className="hover:text-background transition-colors">Stores</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/category/electronics" className="hover:text-background transition-colors">Electronics</Link></li>
              <li><Link to="/category/fashion" className="hover:text-background transition-colors">Fashion</Link></li>
              <li><Link to="/category/home-kitchen" className="hover:text-background transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/category/beauty" className="hover:text-background transition-colors">Beauty</Link></li>
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
          <p>© {new Date().getFullYear()} DealsPro. All rights reserved.</p>
          <p className="mt-2">
            Prices and availability are subject to change. We earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
