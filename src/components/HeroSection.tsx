import { ArrowRight, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Announcement Banner */}
        <div className="flex justify-center mb-8">
          <Link 
            to="/about" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border hover:bg-secondary/80 transition-colors"
          >
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">New</span>
            <span className="text-sm text-muted-foreground">See our journey and what's new at DealsPro</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Connecting brands with{' '}
              <span className="gradient-text">right audience.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              We are a technology-driven premier provider of Online Reputation Management services in India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button className="btn-primary h-12 px-6 gap-2">
                  Brand
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/referral">
                <Button variant="outline" className="h-12 px-6 gap-2">
                  <Video className="w-4 h-4" />
                  Blogger/Influencer
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Abstract Business Illustration */}
              <div className="relative bg-gradient-to-br from-secondary to-secondary/50 rounded-3xl p-8 aspect-square">
                {/* Chart Lines */}
                <svg className="w-full h-full" viewBox="0 0 300 300" fill="none">
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Chart Area */}
                  <rect x="40" y="60" width="180" height="140" rx="8" fill="white" className="drop-shadow-lg" />
                  
                  {/* Chart bars */}
                  <rect x="60" y="140" width="20" height="40" rx="4" className="fill-primary/30" />
                  <rect x="90" y="120" width="20" height="60" rx="4" className="fill-primary/50" />
                  <rect x="120" y="100" width="20" height="80" rx="4" className="fill-primary/70" />
                  <rect x="150" y="80" width="20" height="100" rx="4" className="fill-primary" />
                  <rect x="180" y="90" width="20" height="90" rx="4" className="fill-primary/80" />
                  
                  {/* Line Chart */}
                  <polyline 
                    points="60,130 90,110 120,95 150,75 180,85" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Dots on line */}
                  <circle cx="60" cy="130" r="5" className="fill-primary" />
                  <circle cx="90" cy="110" r="5" className="fill-primary" />
                  <circle cx="120" cy="95" r="5" className="fill-primary" />
                  <circle cx="150" cy="75" r="5" className="fill-primary" />
                  <circle cx="180" cy="85" r="5" className="fill-primary" />
                  
                  {/* Person 1 - Woman with laptop */}
                  <ellipse cx="90" cy="250" rx="30" ry="10" className="fill-muted/50" />
                  <rect x="70" y="220" width="40" height="25" rx="4" fill="#374151" /> {/* Laptop */}
                  <rect x="72" y="222" width="36" height="18" rx="2" fill="#60A5FA" /> {/* Screen */}
                  <circle cx="90" cy="200" r="12" fill="#FCD34D" /> {/* Head */}
                  <path d="M78 205 Q90 215 102 205" fill="#1F2937" /> {/* Hair */}
                  
                  {/* Person 2 - Man presenting */}
                  <ellipse cx="230" cy="250" rx="25" ry="8" className="fill-muted/50" />
                  <rect x="218" y="180" width="24" height="60" rx="4" fill="#3B82F6" /> {/* Body */}
                  <circle cx="230" cy="165" r="14" fill="#FCD34D" /> {/* Head */}
                  <rect x="215" y="155" width="30" height="10" rx="2" fill="#1F2937" /> {/* Hair */}
                  
                  {/* Floating elements */}
                  <circle cx="250" cy="50" r="25" className="fill-primary/20" />
                  <path d="M240 50 L250 40 L260 50 L250 55 Z" className="fill-primary" />
                  
                  <circle cx="45" cy="40" r="15" className="fill-accent/30" />
                  <text x="45" y="45" textAnchor="middle" className="fill-muted-foreground text-xs">?</text>
                  
                  {/* Globe icon */}
                  <circle cx="260" cy="120" r="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <ellipse cx="260" cy="120" rx="8" ry="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                  <line x1="242" y1="120" x2="278" y2="120" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
