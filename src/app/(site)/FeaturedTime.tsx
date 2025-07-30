import { FaTag, FaTelegram, FaGem } from "react-icons/fa";

export default function FeaturedTime() {
  return ( /* bg-[#0d2d1e] */
<div className="text-gray-300 py-16 px-4 sm:px-6 md:px-8 bg-yellow-800 bg-opacity-90">
      <div className="max-w-6xl mx-auto space-y-20">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {/* Get Discounts */}
            <div className="flex items-start gap-5 text-left">
              <FaTag className="w-20 h-20 text-blue-400 -mt-5" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Get Discounts
                </h3>
                <p className="mt-3 text-lg text-gray-200">
                  Save more on every purchase with limited-time coupon codes and seasonal offers tailored just for you.
                </p>
              </div>
            </div>

            {/* Book through Telegram bot */}
            <div className="flex items-start gap-5 text-left">
              <FaTelegram className="w-20 h-20 text-blue-400 -mt-5" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Book through Telegram bot
                </h3>
                <p className="mt-3 text-lg text-gray-200">
                  Use our simple and fast Telegram bot to book your services or place crystal orders on the go.
                </p>
              </div>
            </div>

            {/* Purchase Crystals */}
            <div className="flex items-start gap-5 text-left">
              <FaGem className="w-20 h-20 text-blue-400 -mt-5" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Purchase Crystals
                </h3>
                <p className="mt-3 text-lg text-gray-200">
                  Browse and buy enchanting crystals that spark your spirit, straight from our magical catalog.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
