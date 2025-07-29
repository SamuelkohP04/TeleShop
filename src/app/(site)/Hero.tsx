import Link from "next/link";
import { Zap } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return ( /*bg-[#212121]*/
    <div className="mt-6 min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl w-full mx-auto py-16 flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
          

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#CFCFCF] leading-tight">
            Tarot Carding Reading
            <br />
            Consultation
          </h1>

          <p className="text-base text-[#CFCFCF] mb-8 max-w-2xl mx-auto lg:mx-0">
            Receive Guidance in Decision Making for Life
          </p>

          <Link
            href="#book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-5 items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-20 py-3 rounded-xl font-medium text-lg mb-6 duration-300 transition-colors"
          >
            Book&nbsp;Now
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

         
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
      <img
        src="/LandingPage/TarotCardsAnimation.gif"
        alt="Animated GIF"
        className="w-full max-w-md lg:max-w-full h-auto"
      />
</div>

      </div>
    </div>
  );
};

export default HeroSection;
