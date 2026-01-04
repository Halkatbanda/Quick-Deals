import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Services', path: '/services' },
    { name: 'Clients', path: '/stores' },
    { name: 'Contact us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tight">DEALSPRO</span>
              <span className="text-[10px] text-muted-foreground -mt-1 tracking-widest">THINK • CREATE • DELIVER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Link */}
            <Link to="/admin">
              <Button size="sm">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 px-4 rounded-lg ${isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="py-2 px-4 rounded-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => setIsDark(!isDark)}
                className="py-2 px-4 rounded-lg text-foreground text-left flex items-center gap-2"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
