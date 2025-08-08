"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth } from "@/lib/firebaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  CreditCard,
} from "lucide-react";

const SERVICES = [
  {
    id: "tarot",
    name: "Tarot Card",
    description: "Tarot card reading session.",
    duration: "45 minutes",
    price: 68,
    popular: true,
    features: ["Personal guidance", "Future insights", "Spiritual clarity"],
  },
  {
    id: "numerology",
    name: "Numerology",
    description: "Numerology reading session.",
    duration: "45 minutes", 
    price: 68,
    popular: false,
    features: ["Life path analysis", "Personal numbers", "Destiny insights"],
  },
  {
    id: "combo",
    name: "Tarot Card + Numerology",
    description: "Combined tarot card and numerology session.",
    duration: "45 minutes",
    price: 118,
    popular: true,
    features: ["Comprehensive reading", "Best value", "Complete guidance"],
  },
  {
    id: "wedding",
    name: "Auspicious Wedding Date",
    description: "Find an auspicious date for your wedding.",
    duration: "45 minutes",
    price: 88,
    popular: false,
    features: ["Date selection", "Cosmic alignment", "Blessing guidance"],
  },
];

// Strictly defined time slots - each session is 45 minutes
const TIME_SLOTS = [
  { time: "10:00", label: "10:00 AM - 10:45 AM", available: true },
  { time: "11:00", label: "11:00 AM - 11:45 AM", available: true },
  { time: "14:00", label: "2:00 PM - 2:45 PM", available: true },
  { time: "15:00", label: "3:00 PM - 3:45 PM", available: true },
  { time: "16:00", label: "4:00 PM - 4:45 PM", available: true },
];

export default function EnhancedBooking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [consultationType, setConsultationType] = useState<string>("online");
  const [date, setDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleProceed = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();
      const res = await fetch("/api/stripe/bookingCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          service: selectedService.name,
          consultationType,
          date: date ? date.toISOString() : null,
          timeSlot,
          remarks,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to start booking checkout");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              step >= stepNum
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
          </div>
          {stepNum < 4 && (
            <div
              className={`w-12 h-1 mx-2 transition-all duration-300 ${
                step > stepNum
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Book Your Spiritual Journey
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your path to enlightenment and inner wisdom
          </p>
        </motion.div>

        <StepIndicator />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Choose Your Service
                </h2>
                <p className="text-gray-600">
                  Select the spiritual guidance that resonates with you
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                        selectedService?.id === service.id
                          ? "ring-2 ring-purple-500 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <CardHeader className="relative">
                        {service.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-400">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-500" />
                          {service.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          {service.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-purple-600">
                            ${service.price}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  className="px-6 py-3 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!selectedService}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
                >
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/*}
              <div className="flex justify-center pt-6">
                <Button
                  onClick={nextStep}
                  disabled={!selectedService}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              */}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Consultation Type</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="consultationType"
                      value="online"
                      checked={consultationType === "online"}
                      onChange={() => setConsultationType("online")}
                    />
                    Online (Whatsapp video call)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="consultationType"
                      value="physical"
                      checked={consultationType === "physical"}
                      onChange={() => setConsultationType("physical")}
                    />
                    Physical (Location advised later)
                  </label>
                </div>
              </div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select Your Date</h2>
                <p className="text-gray-600">Choose when you&apos;d like to begin your spiritual journey</p>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">{selectedService?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedService?.duration} • ${selectedService?.price}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <DatePicker
                    selected={date}
                    onChange={(d: Date | null) => setDate(d)}
                    minDate={new Date()}
                    className="w-full border rounded-lg px-4 py-2 text-center"
                    inline
                    calendarClassName="shadow-lg border-0 rounded-xl"
                  />
                </div>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-6 py-3 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!date}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
                >
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Choose Your Time
                </h2>
                <p className="text-gray-600">Select your preferred time slot</p>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">
                      {date?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedService?.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={timeSlot === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => setTimeSlot(slot.time)}
                      className={`p-4 h-auto flex flex-col items-center gap-1 transition-all duration-300 ${
                        timeSlot === slot.time
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : slot.available
                          ? "hover:bg-purple-50 hover:border-purple-300"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <span className="font-semibold">{slot.label}</span>
                      {!slot.available && (
                        <span className="text-xs text-red-500">
                          Unavailable
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-6 py-3 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!timeSlot}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
                >
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Final Details
                </h2>
                <p className="text-gray-600">
                  Add any special requests and confirm your booking
                </p>
              </div>

              <Card className="p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                  Special Requests (Optional)
                </h3>
                <Input
                  placeholder="Any specific questions or areas you'd like to focus on..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-semibold">
                      {selectedService?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-semibold">
                      {date?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-semibold">
                      {TIME_SLOTS.find((s) => s.time === timeSlot)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consultation Type:</span>
                    <span className="font-semibold capitalize">{consultationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">
                      {selectedService?.duration}
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">
                      ${selectedService?.price}
                    </span>
                  </div>
                </div>
              </Card>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
                  {error}
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-6 py-3 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  onClick={handleProceed}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
