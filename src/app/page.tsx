import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { HistorySection } from '@/components/home/HistorySection';
import { ProductsSection } from '@/components/home/ProductsSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { B2BSection } from '@/components/home/B2BSection';
import { LeadForm } from '@/components/home/LeadForm';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HistorySection />
      <ProductsSection />
      <HowItWorksSection />
      <B2BSection />
      <LeadForm />
    </>
  );
}
