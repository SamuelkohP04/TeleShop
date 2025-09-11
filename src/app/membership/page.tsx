import { memo } from "react";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";

// Static data - no hydration needed, can be moved to a separate file
// const MEMBERSHIP_PLANS = [
//   {
//     id: "basic",
//     title: "Basic Free Plan",
//     price: "$0",
//     description: [
//       "24/7 Telegram & Website appointment booking access",
//       "Limited notifications from Telegram bot",
//     ],
//   },
//   {
//     id: "enlightenment",
//     title: "Enlightenment Membership Plan",
//     price: "$10",
//     description: [
//       "Birthday discounts: 10% off during birthday month",
//       "10% off bundle: Tarot + Energy Crystal",
//       "24/7 Telegram & Website appointment booking access",
//       "Birthday wishes & unlimited Telegram notifications",
//     ],
//   },
// ] as const;

const SERVICES = [
  {
    id: "tarot",
    title: "Tarot Card",
    price: "$68",
    duration: "45 minutes",
    features: [
      "Personal guidance",
      "Future insights",
      "Spiritual clarity",
    ],
    popular: true,
  },
  {
    id: "numerology",
    title: "Numerology",
    price: "$68",
    duration: "45 minutes",
    features: [
      "Life path analysis",
      "Personal numbers",
      "Destiny insights",
    ],
    popular: false,
  },
  {
    id: "bundle",
    title: "Tarot Card + Numerology",
    price: "$118",
    duration: "45 minutes",
    features: [
      "Comprehensive reading",
      "Best value",
      "Complete guidance",
    ],
    popular: true,
  },
  {
    id: "wedding",
    title: "Auspicious Wedding Date",
    price: "$88",
    duration: "45 minutes",
    features: [
      "Date selection",
      "Cosmic alignment",
      "Blessing guidance",
    ],
    popular: false,
  },
] as const;

// // Memoized membership plan component for better performance
// const MembershipPlan = memo(({ plan }: { plan: typeof MEMBERSHIP_PLANS[number] }) => (
//   <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
//     <h2 className="text-2xl font-bold text-black mb-2">{plan.title}</h2>
//     <p className="text-4xl font-extrabold text-indigo-600">{plan.price}</p>
//     <ul className="mt-4 list-disc list-inside text-black text-sm space-y-2">
//       {plan.description.map((point, i) => (
//         <li key={i}>{point}</li>
//       ))}
//     </ul>
//   </div>
// ));

// MembershipPlan.displayName = 'MembershipPlan';

// Memoized service component for better performance
const ServiceCard = memo(({ service }: { service: typeof SERVICES[number] }) => (
  <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
    {service.popular && (
      <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
        Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-indigo-800 mb-2">{service.title}</h3>
    <ul className="text-sm text-gray-800 list-disc list-inside space-y-2 mb-4">
      {service.features.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-indigo-600">{service.price}</span>
      <span className="text-sm text-gray-600">{service.duration}</span>
    </div>
  </div>
));

ServiceCard.displayName = 'ServiceCard';

// Static page component - no client-side hydration needed
export default function MembershipPage() {
  return (
    <div className="relative bg-black/20 min-h-screen">
      {/* Static background image - no hydration needed */}
      <img
        src="/LandingPage/LandingBackground.jpg"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        loading="eager" // Load immediately for better UX
      />

      {/* Static navigation - no hydration needed */}
      <Navbar />

      {/*Static header content
      <div className="text-center text-white pt-28">
        <h1 className="text-4xl font-extrabold">Membership</h1>
        <p className="text-lg mt-4 max-w-xl mx-auto px-4">
          Welcome to our membership page! Here you can find information about our plans and available spiritual sessions.
        </p>
      </div>
      

      {/* Static membership plans section 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-14 px-4">
        {MEMBERSHIP_PLANS.map((plan) => (
          <MembershipPlan key={plan.id} plan={plan} />
        ))}
      </div>
      

      {/* Static services section */}
      <div className="text-center text-white mt-20">
        <h2 className="text-3xl font-bold">Our Services ✨</h2>
        <p className="text-base mt-2 mb-8">
          Choose the spiritual guidance that resonates with you
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 pb-20">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Static footer - no hydration needed */}
      <Footer />
    </div>
  );
}
