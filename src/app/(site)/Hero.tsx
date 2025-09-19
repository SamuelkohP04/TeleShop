// import Link from "next/link";
// import { Zap } from "lucide-react";
// import Image from "next/image";

const HeroSection = () => {
  return (
    /*bg-[#212121]*/
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

          <div className="inline-flex mt-5 items-center justify-center gap-2 bg-gray-500 text-gray-300 px-8 sm:px-20 py-3 rounded-xl font-medium text-lg mb-6 cursor-not-allowed opacity-60 pointer-events-none">
            Book with Bot (Coming Soon)!
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6v6l4 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <img
            src="/LandingPage/TarotCards.png"
            alt="Tarot Cards"
            className="w-full max-w-md lg:max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
