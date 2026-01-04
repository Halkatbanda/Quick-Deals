import Layout from '@/components/Layout';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: 'Rahul Sharma',
    company: 'TechGadgets India',
    role: 'Founder & CEO',
    avatar: 'RS',
    rating: 5,
    text: 'DealsPro has transformed our product visibility on Amazon. Our ratings improved by 40% within 3 months! The team is incredibly professional and responsive.',
    service: 'Reputation Management',
  },
  {
    name: 'Priya Patel',
    company: 'Fashion Hub',
    role: 'Marketing Director',
    avatar: 'PP',
    rating: 5,
    text: 'The influencer marketing service connected us with the perfect audience. Sales increased by 65% during our campaign period. Highly recommended!',
    service: 'Influencer Marketing',
  },
  {
    name: 'Amit Kumar',
    company: 'Home Essentials',
    role: 'Business Owner',
    avatar: 'AK',
    rating: 5,
    text: 'Professional team, great results. Their reputation management service is worth every penny. Our negative reviews decreased significantly.',
    service: 'Reputation Management',
  },
  {
    name: 'Sneha Reddy',
    company: 'Beauty Bliss',
    role: 'E-commerce Manager',
    avatar: 'SR',
    rating: 5,
    text: 'The email marketing campaigns they designed for us achieved 45% open rates. Their data-driven approach really works!',
    service: 'Email Marketing',
  },
  {
    name: 'Vikram Singh',
    company: 'Sports Gear Pro',
    role: 'Co-founder',
    avatar: 'VS',
    rating: 5,
    text: 'Their affiliate marketing setup helped us expand our reach across India. The ROI has been phenomenal - 5x what we expected!',
    service: 'Affiliate Marketing',
  },
  {
    name: 'Ananya Gupta',
    company: 'Organic Foods Ltd',
    role: 'Head of Growth',
    avatar: 'AG',
    rating: 5,
    text: 'The web scraping solution they built helps us monitor competitor prices in real-time. Game changer for our pricing strategy!',
    service: 'Web Scraping',
  },
  {
    name: 'Rajan Mehta',
    company: 'Electronics Plus',
    role: 'Operations Head',
    avatar: 'RM',
    rating: 5,
    text: 'Business automation saved us 20+ hours every week. Their WhatsApp integration for order updates has improved customer satisfaction.',
    service: 'Business Automation',
  },
  {
    name: 'Kavitha Nair',
    company: 'Kids World',
    role: 'Brand Manager',
    avatar: 'KN',
    rating: 5,
    text: 'Working with DealsPro micro-influencers gave us authentic content that resonated with parents. Our engagement tripled!',
    service: 'Influencer Marketing',
  },
];

const stats = [
  { value: '98%', label: 'Client Satisfaction' },
  { value: '500+', label: 'Successful Campaigns' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '3 Years', label: 'Industry Experience' },
];

const Testimonials = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            What Our <span className="gradient-text">Clients Say</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Don't just take our word for it. Here's what businesses across India have to say about working with us.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Service Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {testimonial.service}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to become our next success story?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their online presence with DealsPro.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
