import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import BrandsShowcase from '@/components/BrandsShowcase';
import ClientsSection from '@/components/ClientsSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandsShowcase />
      <ServicesSection />
      <StatsSection />
      <ClientsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
