const stats = [
  { value: '70K+', label: 'Organic feedbacks delivered' },
  { value: '5K+', label: 'Clients' },
  { value: '100+', label: 'Product Tested' },
  { value: '200+', label: 'Categories' },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transformation by the numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Numbers don't lie. Our tech-driven approach ensures your online reputation stays pristine. Trust us to safeguard your brand's digital presence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          * Our numbers reflect a year-long composite of data, showcasing our consistent performance and reliability.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
