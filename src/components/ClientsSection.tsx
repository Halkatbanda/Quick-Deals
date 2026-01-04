import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    company: 'TechGadgets India',
    avatar: 'RS',
    rating: 5,
    text: 'DealsPro has transformed our product visibility on Amazon. Our ratings improved by 40% within 3 months!',
  },
  {
    name: 'Priya Patel',
    company: 'Fashion Hub',
    avatar: 'PP',
    rating: 5,
    text: 'The influencer marketing service connected us with the perfect audience. Sales increased significantly.',
  },
  {
    name: 'Amit Kumar',
    company: 'Home Essentials',
    avatar: 'AK',
    rating: 5,
    text: 'Professional team, great results. Their reputation management service is worth every penny.',
  },
];

const ClientsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Clients
          </h2>
          <p className="text-lg text-muted-foreground">
            Our customers make us great.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
