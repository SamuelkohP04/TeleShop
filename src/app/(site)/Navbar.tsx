"use client";

import Link from "next/link";
import { Leaf, X } from "lucide-react";
import { useEffect, useState } from "react";
//import { getGitHubStars } from "@/utils/github";

export default function Navbar() {
  const [stars, setStars] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const repo = "idee8/Awareness Living";

  useEffect(() => {
    //getGitHubStars(repo).then(setStars);
  }, []);

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return ( /* bg-[#212121]*/
    <nav className="fixed top-0 z-50 w-full bg-[#212121]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
          <Leaf
            className="h-10 w-10"
            fill="#76C893"        // a nice green shade
            stroke="black"
            strokeWidth={1.4}
          />
            <span className="text-lg font-semibold text-white">
              Awareness Living
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-base text-white/90 transition hover:text-white"
          >
            About
          </Link>
          <Link
            href="/membership"
            className="text-base text-white/90 transition hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/faq"
            className="text-base text-white/90 transition hover:text-white"
          >
            FAQ
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/login"  /* update this link as needed */
            className="flex items-center gap-2 rounded-md bg-[#2C2C2C] px-4 py-2 text-sm text-white/90 transition hover:bg-[#3C3C3C]"
          >
            Login
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>


        <div className="flex md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
      <div className="md:hidden px-4 pb-4 pt-2 bg-[#212121]">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-base text-white/90 transition hover:text-white"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/membership"
            className="text-base text-white/90 transition hover:text-white"
            onClick={toggleMenu}
          >
            Features
          </Link>
          <Link
            href="/faq"
            className="text-base text-white/90 transition hover:text-white"
            onClick={toggleMenu}
          >
            FAQ
          </Link>
          <a
            href="/login"
            className="flex items-center gap-2 rounded-md bg-[#2C2C2C] px-4 py-2 text-sm text-white/90 transition hover:bg-[#3C3C3C]"
            onClick={toggleMenu}
          >
            Login
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    )}

    </nav>
  );
}
