import { Metadata } from "next";
// import CTA from "@/app/(site)/Cta";
// import FeaturedTime from "@/app/(site)/FeaturedTime";
import Footer from "@/app/(site)/Footer";
import HeroSection from "@/app/(site)/Hero";
// import MakerIntro from "@/app/(site)/MakerIntro";
import Navbar from "@/app/(site)/Navbar";
// import TestimonialsPage from "@/app/(site)/Testimonials";
import InteractiveSections from "@/components/InteractiveSections";

export const metadata: Metadata = {
  title: "Awareness Living",
  description: "Your journey to self-discovery starts here with Tarot readings and Numerology consultations",
};

export default function HomePage() {
  return (
      <div className="relative bg-black/20">
      <img
        src="/LandingPage/LandingBackground.jpg"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        loading="eager" // Load immediately for better UX
      />
      <div>
        <Navbar />
        <HeroSection />
        <InteractiveSections />
        <Footer />
      </div>
    </div>
  );
}

