const stats = [
  { value: '50K+', label: 'Authentic reviews generated' },
  { value: '3K+', label: 'Brands served' },
  { value: '500+', label: 'Active creators' },
  { value: '150+', label: 'Product categories' },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Results that speak for themselves
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform has helped hundreds of brands build trust and credibility through genuine creator partnerships and verified customer feedback.
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
          * Data reflects cumulative metrics across all active campaigns and partnerships.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
