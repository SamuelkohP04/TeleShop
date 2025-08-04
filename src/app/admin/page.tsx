"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Crown,
  Users,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Star,
  Moon,
  Sparkles,
  Gem,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

type UserProfile = {
  uid: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  paymentPlan: string;
  isAdmin: boolean;
};

type Booking = {
  id: string;
  uid: string;
  service: string;
  date: string;
  timeSlot: string;
  remarks: string;
  createdAt: any;
  userProfile?: UserProfile;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateBookings, setSelectedDateBookings] = useState<Booking[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);

  // Available time slots (45 minutes each)
  const timeSlots = [
    "10:00 AM - 10:45 AM",
    "11:00 AM - 11:45 AM",
    "2:00 PM - 2:45 PM",
    "3:00 PM - 3:45 PM",
    "4:00 PM - 4:45 PM",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const res = await fetch("/api/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${idToken}` },
          });
          if (res.ok) {
            const userProfile = await res.json();
            if (!userProfile.isAdmin) {
              // Not an admin, redirect to regular dashboard
              router.push("/dashboard");
              return;
            }
            setProfile(userProfile);
            await fetchAllBookings(idToken);
          } else {
            router.push("/login");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchAllBookings = async (idToken: string) => {
    setBookingsLoading(true);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return bookingDate.toDateString() === dateStr;
    });
  };

  const handleDateClick = (date: Date) => {
    const dayBookings = getBookingsForDate(date);
    setSelectedDate(date);
    setSelectedDateBookings(dayBookings);
    setShowModal(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen p-4 relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: "url(/DashboardPage/seamless-starry-pattern.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <Gem className="h-16 w-16 text-purple-300 mx-auto mb-4 animate-pulse" />
          <p className="text-purple-300 text-xl">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="min-h-screen p-4 relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: "url(/DashboardPage/seamless-starry-pattern.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <Star className="h-16 w-16 text-red-300 mx-auto mb-4 animate-pulse" />
          <p className="text-red-300 text-xl">Access Denied</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(/DashboardPage/seamless-starry-pattern.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Minimal overlay for text readability without obscuring the moon pattern */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Mystical Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-pulse">
          <Star className="h-6 w-6 text-yellow-300" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce">
          <Moon className="h-8 w-8 text-blue-300" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse">
          <Sparkles className="h-5 w-5 text-purple-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mystical Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl"
        >
          <div className="flex items-center space-x-4">
            <Crown className="h-12 w-12 text-yellow-300 animate-pulse" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-purple-200/70">
                Master of Sacred Appointments
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              User Portal
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/50 text-red-300 hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit Portal
            </Button>
          </div>
        </motion.div>

        {/* Admin Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 rounded-2xl opacity-75 group-hover:opacity-100 animate-pulse"
              style={{ filter: "blur(1px)" }}
            ></div>
            <Card className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  Total Bookings
                </h3>
                <p className="text-3xl font-bold text-white">
                  {bookings.length}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 animate-pulse"
              style={{ filter: "blur(1px)" }}
            ></div>
            <Card className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">
                  Unique Clients
                </h3>
                <p className="text-3xl font-bold text-white">
                  {new Set(bookings.map((b) => b.uid)).size}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-2xl opacity-75 group-hover:opacity-100 animate-pulse"
              style={{ filter: "blur(1px)" }}
            ></div>
            <Card className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-300 mb-2">
                  Today's Sessions
                </h3>
                <p className="text-3xl font-bold text-white">
                  {getBookingsForDate(new Date()).length}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mystical Admin Calendar */}
        <div className="relative group mb-8">
          <div
            className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl opacity-60 group-hover:opacity-90 animate-pulse"
            style={{ filter: "blur(1px)" }}
          ></div>
          <Card className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <Gem className="h-8 w-8 text-purple-300 animate-pulse" />
                <div>
                  <h2 className="text-2xl font-bold text-purple-300">
                    Sacred Appointments Calendar
                  </h2>
                  <p className="text-purple-200/70">
                    Click any date to view all bookings and client details
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {bookingsLoading ? (
                <div className="flex justify-center mb-6">
                  <div className="mystical-calendar min-h-[320px] flex items-center justify-center">
                    <div className="bg-black/20 border border-purple-500/30 rounded-lg p-4 w-full max-w-md h-80 flex items-center justify-center">
                      <div className="text-center">
                        <Gem className="h-8 w-8 text-purple-300 mx-auto mb-2 animate-pulse" />
                        <p className="text-purple-300 text-sm">
                          Loading cosmic calendar...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mb-6">
                    <div className="mystical-calendar min-h-[320px] flex items-center justify-center">
                      <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileClassName={({ date, view }) => {
                          const isToday =
                            date.toDateString() === new Date().toDateString();
                          const hasBookings =
                            getBookingsForDate(date).length > 0;
                          return [
                            isToday ? "bg-purple-100 dark:bg-purple-800" : "",
                            hasBookings ? "border-2 border-purple-400" : "",
                            "text-gray-900 dark:text-gray-100 calendar-dark-text",
                          ]
                            .filter(Boolean)
                            .join(" ");
                        }}
                        tileContent={({ date, view }) => {
                          if (view === "month") {
                            const count = getBookingsForDate(date).length;
                            if (count > 0) {
                              return (
                                <div className="flex justify-center items-center mt-1">
                                  <Badge
                                    variant="secondary"
                                    className="bg-purple-500 text-white text-xs px-1 py-0.5"
                                  >
                                    {count}
                                  </Badge>
                                </div>
                              );
                            }
                          }
                          return null;
                        }}
                        onClickDay={handleDateClick}
                        className="bg-black/20 border border-purple-500/30 rounded-lg p-4 text-purple-300"
                      />
                    </div>
                  </div>

                  {/* Available Time Slots Info */}
                  <div className="bg-black/20 border border-purple-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Available Time Slots (45 minutes each)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {timeSlots.map((slot, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-purple-500/50 text-purple-300 text-center"
                        >
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Details Modal */}
        {showModal && selectedDate && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-purple-500/50 rounded-2xl shadow-2xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto relative mx-auto">
              <div className="sticky top-0 bg-gradient-to-br from-indigo-900 to-purple-900 z-10 pb-4 mb-4 border-b border-purple-500/30">
                <button
                  className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
                <div className="text-center">
                  <CalendarIcon className="h-12 w-12 text-purple-300 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-purple-300">
                    Bookings for {selectedDate.toLocaleDateString()}
                  </h3>
                  <p className="text-purple-200/70">
                    {selectedDateBookings.length} appointment(s) scheduled
                  </p>
                </div>
              </div>

              {selectedDateBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-16 w-16 text-purple-300/50 mx-auto mb-4" />
                  <p className="text-purple-300 text-lg">
                    No appointments scheduled for this date
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateBookings.map((booking, idx) => (
                    <div
                      key={booking.id}
                      className="bg-black/30 rounded-lg border border-purple-500/30 p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Booking Details */}
                        <div>
                          <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            Appointment Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-purple-200">
                                Time: {booking.timeSlot}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Gem className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-purple-200">
                                Service: {booking.service}
                              </span>
                            </div>
                            {booking.remarks && (
                              <div className="flex items-start">
                                <Star className="h-4 w-4 text-purple-400 mr-2 mt-0.5" />
                                <span className="text-purple-200">
                                  Notes: {booking.remarks}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Client Details */}
                        <div>
                          <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
                            <User className="h-5 w-5 mr-2" />
                            Client Information
                          </h4>
                          {booking.userProfile ? (
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-purple-200">
                                  {booking.userProfile.fullname}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-purple-200">
                                  {booking.userProfile.email}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-purple-200">
                                  {booking.userProfile.phone || "Not provided"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Crown className="h-4 w-4 text-purple-400 mr-2" />
                                <Badge
                                  variant={
                                    booking.userProfile.paymentPlan ===
                                    "premium"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {booking.userProfile.paymentPlan}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <p className="text-purple-300/50 text-sm">
                              Loading client details...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
