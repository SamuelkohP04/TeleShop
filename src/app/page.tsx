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
    <div className="fixed inset-0 bg-gradient-to-r from-[#9921e8] to-[#5f72be] -z-10">

      <div>
        <Navbar />
        <HeroSection />
        <InteractiveSections />
        <Footer />
      </div>
    </div>
  );
}

