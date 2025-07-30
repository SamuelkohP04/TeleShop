import Navbar from "@/app/(site)/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function MembershipPage() {
  const membershipPlans = [
    {
      title: "Basic Free Plan",
      price: "$0",
      description: [
        "24/7 Telegram & Website appointment booking access",
        "Limited notifications from Telegram bot",
      ],
      //image: "/LandingPage/BasicPlan.jpg", // Replace with actual image path
    },
    {
      title: "Enlightenment Membership Plan",
      price: "$10",
      description: [
        "Birthday discounts: having a 10% discount on a purchase during birthday month",
        "Discounted bundle of 10% off when booking a tarot card reading + energy crystal purchase",
        "24/7 Telegram & Website appointment booking access",
        "Birthday wishes & other unlimited notifications from Telegram bot",
      ],
      //image: "/LandingPage/PremiumPlan.jpg", // Replace with actual image path
    },
  ];
  return (
    <div className="relative bg-black/20">
      {/* Background GIF */}
      <img
        src="/LandingPage/LandingBackground.jpg"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      <div>
        <Navbar />
        <h1 className="text-4xl font-bold text-white mb-8">Membership</h1>
        <p className="text-base sm:text-lg text-white m-4 sm:m-8 md:m-14 
        max-w-sm sm:max-w-md md:max-w-2xl 
        
        mx-auto">
          Welcome to our membership page! Here you can find information about
          our membership plans.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 place-items-center mt-10 max-w-4xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-full aspect-square bg-gray-300 rounded-lg overflow-hidden 
                flex flex-col p-8  text-white font-semibold text-lg 
                transform transition-transform duration-300 hover:scale-105"
              >
                <p className="mt-4 text-black text-xl font-bold ">
                  {plan.title}
                </p>
                <p className="mt-2 text-black text-5xl font-bold">
                  {plan.price}
                </p>
                <ul className="mt-2 text-black text-sm space-y-4">
                  {plan.description.map((point, index) => (
                    <li key={index} className="block text-black list-disc ">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Add your membership content here */}
      </div>
    </div>
  );
}
