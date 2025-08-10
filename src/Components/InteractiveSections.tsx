'use client';

import dynamic from 'next/dynamic';
import FadeInSection from './FadeInSection';
import PerformanceOptimizer from './PerformanceOptimizer';

// Dynamic imports with Next.js for better performance and integration
const FeaturedTime = dynamic(() => import('@/app/(site)/FeaturedTime'), {
  loading: () => <LoadingPlaceholder />,
  ssr: true, // Enable SSR for better SEO
});

const MakerIntro = dynamic(() => import('@/app/(site)/MakerIntro'), {
  loading: () => <LoadingPlaceholder />,
  ssr: true,
});

const TestimonialsPage = dynamic(() => import('@/app/(site)/Testimonials'), {
  loading: () => <LoadingPlaceholder />,
  ssr: true,
});

const CTA = dynamic(() => import('@/app/(site)/Cta'), {
  loading: () => <LoadingPlaceholder />,
  ssr: true,
});

// Loading placeholder component with better visual feedback
const LoadingPlaceholder = () => (
  <div className="min-h-[200px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-white/60 text-sm">Loading...</div>
  </div>
);

export default function InteractiveSections() {
  return (
    <PerformanceOptimizer 
      threshold={0.6} // Adjust threshold for performance sensitivity
      fallback={<LoadingPlaceholder />}
    >
      {/* Featured Time Section */}
      <FadeInSection>
        <FeaturedTime />
      </FadeInSection>

      {/* Maker Introduction Section */}
      <FadeInSection>
        <MakerIntro />
      </FadeInSection>

      {/* Testimonials Section */}
      <FadeInSection>
        <TestimonialsPage />
      </FadeInSection>

      {/* Call to Action Section */}
      <FadeInSection>
        <CTA />
      </FadeInSection>
    </PerformanceOptimizer>
  );
} 