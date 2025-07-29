export default function CTA() {
  return (
    <section className="relative bg-green-600 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-4xl font-medium tracking-tight text-gray-200 md:text-5xl lg:text-6xl">
          Get Aware with Awareness Living
        </h2>
        <p className="mb-8 text-lg text-gray-200 md:text-xl">
          Book a consultation session now!
        </p>
        <a
          href="#book"               /* update as needed */
          className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-3 text-base font-medium text-black transition-colors hover:bg-gray-200/90"
        >
          Book&nbsp;Now
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
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
        </a>
      </div>
    </section>
  );
}
