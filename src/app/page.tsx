import { Metadata } from "next";
import CTA from "@/app/(site)/Cta";
//import FAQ from "@/app/(site)/Faq";
import FeaturedTime from "@/app/(site)/FeaturedTime";
import Footer from "@/app/(site)/Footer";
import HeroSection from "@/app/(site)/Hero";
import MakerIntro from "@/app/(site)/MakerIntro";
import Navbar from "@/app/(site)/Navbar";
//import PricingSection from "@/app/(site)/pricing";
import TestimonialsPage from "@/app/(site)/Testimonials";
import FadeInSection from "@/components/FadeInSection";


// required by Nextra
export const metadata: Metadata = {
  title: "Awareness Living",
};

export default function BlankPage() {
  return (
    <div className="relative bg-black/20">
      {/* Background GIF */}
      <img
        src="/LandingPage/LandingBackground.jpg"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      {/* Page content */}
      <div>
        <Navbar />
        <HeroSection />
        <FadeInSection><FeaturedTime /></FadeInSection>
        <FadeInSection><MakerIntro /></FadeInSection>
        <FadeInSection><TestimonialsPage /></FadeInSection>
        <FadeInSection><CTA /></FadeInSection>
        <Footer />
      </div>
    </div>
  );
}

