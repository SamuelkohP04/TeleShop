"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John Tan",
    text: `Benjamin has been helpful in my spiritual life. He has guided me towards the right path through numerology and tarot card consultations. This helped me to understand my strengths and weaknesses better.`,
    avatar: "/LandingPage/FakePerson1.jpeg",
  },
  {
    name: "Emily Lim",
    text: `I was skeptical at first, but the readings truly resonated. The guidance I received helped me make confident decisions in life.`,
    avatar: "/LandingPage/FakePerson2.jpeg",
  },
  {
    name: "Amy Soh",
    text: `A transformative experience. Benjamin’s insights gave me clarity in both personal and career paths. Highly recommended.`,
    avatar: "/LandingPage/FakePerson3.jpeg",
  },
];

export default function TestimonialsPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const testimonial = testimonials[current];

  return (
    <div className="bg-gray-900 bg-opacity-50 text-white py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">What Clients Say ✨</h2>

        <div className="relative flex items-center justify-center min-h-[320px]">
          {/* Left arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 z-10 p-2 text-gray-400 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Static background card */}
          <div className="w-full sm:w-[80%] min-h-[320px] bg-zinc-900 border border-zinc-800 rounded-lg p-6 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current} // ensures re-render on index change
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col sm:flex-row gap-6 p-4"
                >
                {/* Avatar */}
                <div className="w-full sm:w-1/3 flex-shrink-0">
                  <div className="w-full aspect-square bg-gray-300 rounded-md overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="sm:w-2/3 flex flex-col justify-between">
                  <p className="text-gray-300 text-2xl mb-4">{testimonial.text}</p>
                  <p className="text-white font-semibold text-3xl">{testimonial.name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 z-10 p-2 text-gray-400 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i === current ? "bg-white" : "bg-zinc-600"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
