export default function MakerIntro() {
  const categories = [
    {
      title: "Tarot Card Consultation",
      image: "/LandingPage/CuteTarotReader.jpg", // Replace with real image
    },
    {
      title: "Numerology Consultation",
      image: "/LandingPage/CoolNumberBoy.jpg",
    },
    {
      title: "Tarot Card + Numerology",
      image: "/LandingPage/TarotAndNumerlogy.jpg",
    },
  ];

  return (
<div className="bg-opacity-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Services Offered 🔮
      </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className="w-full aspect-square bg-gray-300 rounded-lg overflow-hidden 
                flex items-center justify-center text-white font-semibold text-lg 
                transform transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url('${category.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* If image is missing */}
                {!category.image && "PLACEHOLDER"}
              </div>
              <p className="mt-4 text-white text-base font-medium">
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
