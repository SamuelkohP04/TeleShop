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
    </section>
  );
}
