"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { format } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Importing types from admin page & firebase auth
import type { UserProfile } from "@/app/admin/page"
import type { Booking } from "@/app/admin/page"
import type { User as FirebaseUser } from "firebase/auth";
import {
  Star,
  Moon,
  Sun,
  Gem,
  Sparkles,
  Eye,
  Clock,
  Calendar as CalendarIcon,
  Users,
  Crown,
} from "lucide-react";

// Extend Booking with optional consultationType used by dashboard UI
type DashboardBooking = Booking & { consultationType?: string | null };

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
];

// Type guard for DashboardBooking
const hasConsultationType = (b: Booking | DashboardBooking): b is DashboardBooking => {
  return typeof (b as { consultationType?: unknown }).consultationType !== "undefined";
};

// Static components that don't need re-rendering
const MysticalBackground = () => (
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
    <div
      className="absolute top-1/3 right-1/3 animate-spin"
      style={{ animationDuration: "20s" }}
    >
      <Sun className="h-7 w-7 text-orange-300" />
    </div>
  </div>
);

const MysticalHeader = ({ profile, onUpgrade, onLogout }: { profile: UserProfile | null; onUpgrade: () => void; onLogout: () => void }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 p-4 md:p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl">
    <div className="flex items-center space-x-4">
      <Gem className="h-10 w-10 text-purple-300 animate-pulse" />
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Mystic Portal
        </h1>
        <p className="text-purple-200/70 text-sm">
          Your spiritual journey awaits
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      {profile?.paymentPlan === "Enlightenment" ? (
        <Button
          disabled
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg cursor-not-allowed opacity-60 transition-all duration-300"
        >
          <Crown className="h-4 w-4 mr-2" />
          Ascended to Enlightenment
        </Button>
      ) : (
        <Button
          onClick={onUpgrade}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
        >
          <Crown className="h-4 w-4 mr-2" />
          Ascend to Enlightenment
        </Button>
      )}
      <Button
        onClick={onLogout}
        variant="outline"
        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
      >
        <Eye className="h-4 w-4 mr-2" />
        Exit Portal
      </Button>
    </div>
  </div>
);

const MysticalWelcome = ({ profile }: { profile: UserProfile | null}) => (
  <div className="text-center mb-8 p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
      Welcome Back,{" "}
      {profile?.username || profile?.fullname || "Mystical Wanderer"}!
    </h1>
    <p className="text-purple-200/70">
      The universe has been waiting for your return...
    </p>
  </div>
);

const NavigationCards = ({ router }: { router: ReturnType<typeof useRouter> }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="relative group">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 animate-pulse"
        style={{ filter: "blur(1px)" }}
      ></div>
      <Card
        className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer"
        onClick={() => router.push("/dashboard/book")}
      >
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Gem className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-purple-300 mb-2">
            Book a Reading
          </h3>
          <p className="text-purple-200/70 text-sm">
            Discover what the stars have in store for you
          </p>
        </CardContent>
      </Card>
    </div>

    <div className="relative group">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 animate-pulse"
        style={{ filter: "blur(1px)" }}
      ></div>
      <Card
        className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer"
        onClick={() => router.push("/dashboard/profile")}
      >
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-purple-300 mb-2">
            Spiritual Profile
          </h3>
          <p className="text-purple-200/70 text-sm">
            Manage your cosmic identity and preferences
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Memoized calendar component
const BookingsCalendar = ({ bookings, onDateClick }: { bookings: DashboardBooking[]; onDateClick: (date: Date) => void }) => {
  const tileContent = useCallback(({ date, view }: { date: Date; view: "month" | "year" | "decade" | "century" }) => {
    if (view === "month") {
      const count = bookings.filter((b: DashboardBooking) => {
        if (!b.date) return false;
        const ymd = date.toISOString().slice(0, 10);
        return b.date.slice(0, 10) === ymd;
      }).length;
      
      if (count > 0) {
        return (
          <div className="flex justify-center items-center mt-1">
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i}
                className="inline-block w-2 h-2 bg-purple-400 rounded-full mx-0.5 animate-pulse"
              ></span>
            ))}
          </div>
        );
      }
    }
    return null;
  }, [bookings]);

  return (
    <Calendar
      tileContent={tileContent}
      onClickDay={onDateClick}
      className="bg-black/20 border border-purple-500/30 rounded-lg p-4 text-gray-900 dark:text-gray-100 calendar-dark-text"
    />
  );
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalBooking, setModalBooking] = useState<DashboardBooking[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const router = useRouter();

  // Memoized handlers to prevent unnecessary re-renders
  const handleLogout = useCallback(async () => {
    await auth.signOut();
    router.push("/login");
  }, [router]);

  const handleUpgrade = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to start checkout");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized date click handler
  const handleDateClick = useCallback((date: Date) => {
    const bookingsOnDate = bookings.filter((b: DashboardBooking) => {
      if (!b.date) return false;
      const ymd = date.toISOString().slice(0, 10);
      return b.date.slice(0, 10) === ymd;
    });
    
    if (bookingsOnDate.length > 0) {
      setSelectedDate(date);
      setModalBooking(bookingsOnDate);
      setShowModal(true);
    }
  }, [bookings]);

  // Memoized profile fetch
  const fetchProfileForUser = useCallback(async (user: FirebaseUser) => {
    setLoading(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch profile");
      }
      const data = await res.json();
      const convertTimestamp = (ts: unknown) => {
        if (!ts) return "-";
        if (typeof ts === "string") return ts;
        if (typeof ts === "object" && ts !== null) {
          const maybe = ts as { _seconds?: number; seconds?: number };
          if (typeof maybe._seconds === "number") return new Date(maybe._seconds * 1000).toLocaleString();
          if (typeof maybe.seconds === "number") return new Date(maybe.seconds * 1000).toLocaleString();
        }
        return "-";
      };
      const dataObj = data as Record<string, unknown>;
      setProfile({
        ...(data as UserProfile),
        dob: convertTimestamp(dataObj["dob"]),
        // createdAt may not be on UserProfile; keep safe conversion if present
        // @ts-expect-error dynamic field from backend
        createdAt: convertTimestamp(dataObj["createdAt"]),
      });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized bookings fetch
  const fetchBookings = useCallback(async () => {
    if (!profile || !auth.currentUser) return;
    setBookingsLoading(true);
    setBookingsError(null);
    try {
      const idToken = await auth.currentUser.getIdToken();
      const res = await fetch("/api/myBookings", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch bookings");
      }
      const data = await res.json();
      setBookings((data.bookings as DashboardBooking[]) || []);
    } catch (err: unknown) {
      setBookingsError((err as Error).message);
    } finally {
      setBookingsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfileForUser(user);
      } else {
        setLoading(false);
        setError("Not authenticated");
      }
    });

    return () => unsubscribe();
  }, [fetchProfileForUser]);

  useEffect(() => {
    if (profile) fetchBookings();
  }, [profile, fetchBookings]);

  // Memoized loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-300 border-t-transparent shadow-lg shadow-purple-500/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Gem className="h-8 w-8 text-purple-300 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-center p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl">
          <Eye className="h-16 w-16 text-red-400 mx-auto mb-4 animate-pulse" />
          <div className="text-red-400 text-lg mb-6 font-mystical">{error}</div>
          <Button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Return to the Portal
          </Button>
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
      <div className="absolute inset-0 bg-black/20"></div>
      <MysticalBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        <MysticalHeader 
          profile={profile} 
          onUpgrade={handleUpgrade} 
          onLogout={handleLogout} 
        />
        <MysticalWelcome profile={profile} />
        <NavigationCards router={router} />

        {/* Dynamic Bookings Section */}
        <div className="relative group mb-8 overflow-x-auto">
          <div
            className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl opacity-60 group-hover:opacity-90 animate-pulse"
            style={{ filter: "blur(1px)" }}
          ></div>
          <Card className="relative bg-black/30 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <CalendarIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Sacred Appointments</h2>
                  <p className="text-purple-100 text-sm">
                    Your spiritual consultations
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {bookingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-300 border-t-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gem className="h-6 w-6 text-purple-300 animate-pulse" />
                    </div>
                  </div>
                  <span className="ml-4 text-purple-300">
                    Consulting the cosmic calendar...
                  </span>
                </div>
              ) : bookingsError ? (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <div className="text-red-400">{bookingsError}</div>
                </div>
              ) : (
                <div className="flex justify-center mb-6">
                  <div className="mystical-calendar min-h-[320px] flex items-center justify-center">
                    {bookings.length === 0 ? (
                      <div className="bg-black/20 border border-purple-500/30 rounded-lg p-4 w-full max-w-md h-80 flex items-center justify-center">
                        <div className="text-center">
                          <Gem className="h-8 w-8 text-purple-300 mx-auto mb-2 animate-pulse" />
                          <p className="text-purple-300 text-sm">
                            No cosmic appointments yet...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <BookingsCalendar 
                        bookings={bookings} 
                        onDateClick={handleDateClick} 
                      />
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modal - Only render when needed */}
        {showModal && modalBooking && (
          <BookingModal
            modalBooking={modalBooking}
            selectedDate={selectedDate}
            setShowModal={setShowModal}
            setBookings={setBookings}
            bookings={bookings}
            setModalError={setModalError}
            modalLoading={modalLoading}
            setModalLoading={setModalLoading}
            modalError={modalError}
          />
        )}
      </div>
    </div>
  );
}

// Separate modal component to reduce main component complexity
type BookingModalProps = {
  modalBooking: DashboardBooking[] | null;
  selectedDate: Date | null;
  setShowModal: (value: boolean) => void;
  setBookings: React.Dispatch<React.SetStateAction<DashboardBooking[]>>;
  bookings: DashboardBooking[];
  setModalError: (value: string | null) => void;
  modalLoading: boolean;
  setModalLoading: (value: boolean) => void;
  modalError: string | null;
};

const BookingModal = ({ 
  modalBooking, 
  selectedDate, 
  setShowModal, 
  setBookings, 
  bookings,
  setModalError,
  modalLoading,
  setModalLoading,
  modalError
}: BookingModalProps) => {
  const [calendarRescheduleDate, setCalendarRescheduleDate] = useState<Date | null>(null);
  const [rescheduleTimeSlot, setRescheduleTimeSlot] = useState<string>("");
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | false>(false);

  const handleCancelBooking = useCallback(async (booking: DashboardBooking) => {
    if (!window.confirm("Are you sure you want to cancel this booking? No refunds will be issued.")) return;
    
    setModalLoading(true);
    setModalError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();
      const res = await fetch("/api/cancelBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ bookingId: booking.id }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to cancel booking");
      }
      setBookings(bookings.filter((b: DashboardBooking) => b.id !== booking.id));
      setShowModal(false);
    } catch (err: unknown) {
      setModalError((err as Error).message);
    } finally {
      setModalLoading(false);
    }
  }, [setBookings, bookings, setShowModal, setModalLoading, setModalError]);

  const handleRescheduleBooking = useCallback(async (booking: DashboardBooking, newDate: Date | null, newTimeSlot?: string) => {
    if (!newDate) return;
    if (!window.confirm("Are you sure you want to reschedule this booking?")) return;
    
    setModalLoading(true);
    setModalError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();
      const res = await fetch("/api/rescheduleBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({
          bookingId: booking.id,
          newDate: newDate.toISOString(),
          newTimeSlot: newTimeSlot || booking.timeSlot,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to reschedule booking");
      }
      setBookings(
        bookings.map((b: DashboardBooking) =>
          b.id === booking.id
            ? {
                ...b,
                date: newDate.toISOString(),
                timeSlot: newTimeSlot || b.timeSlot,
              }
            : b
        )
      );
      setShowModal(false);
      setRescheduleBookingId(false);
      setCalendarRescheduleDate(null);
      setRescheduleTimeSlot("");
    } catch (err: unknown) {
      setModalError((err as Error).message);
    } finally {
      setModalLoading(false);
    }
  }, [setBookings, bookings, setShowModal, setModalLoading, setModalError]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-purple-500/50 rounded-2xl shadow-2xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto relative mx-auto">
        <div className="sticky top-0 bg-gradient-to-br from-indigo-900 to-purple-900 z-10 pb-4 mb-4 border-b border-purple-500/30">
          <button
            className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
            onClick={() => {
              setShowModal(false);
              setRescheduleBookingId(false);
              setModalError(null);
            }}
          >
            <Eye className="h-6 w-6" />
          </button>
          <div className="text-center">
            <Gem className="h-12 w-12 text-purple-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-purple-300">
              Sacred Appointments
            </h3>
            <p className="text-purple-200/70">
              {selectedDate ? selectedDate.toLocaleDateString() : ""}
            </p>
          </div>
        </div>
        
        {Array.isArray(modalBooking) &&
          modalBooking.map((booking: DashboardBooking) => (
            <div
              key={booking.id}
              className="mb-6 p-4 bg-black/30 rounded-lg border border-purple-500/30 last:mb-0"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-purple-300 font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Reading Type:
                  </span>
                  <p className="text-purple-100">{booking.service}</p>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Cosmic Time:
                  </span>
                  <p className="text-purple-100">
                    {booking.timeSlot || "Timeless"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Sacred Notes */}
                <div>
                  <span className="text-purple-300 font-semibold flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    Sacred Notes:
                  </span>
                  <p className="text-purple-100 text-sm">
                    {booking.remarks || "No special guidance requested"}
                  </p>
                </div>

                {/* New Section */}
                <div>
                  <span className="text-purple-300 font-semibold flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    Meeting Type:
                  </span>
                  <p className="text-purple-100 text-sm">
                    {hasConsultationType(booking) && booking.consultationType ? booking.consultationType : "Not provided"}
                  </p>
                </div>
              </div>

              
              {modalError && (
                <div className="text-red-400 mb-4 p-2 bg-red-900/30 rounded border border-red-500/30">
                  {modalError}
                </div>
              )}
              
              {rescheduleBookingId === booking.id ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Calendar
                      onClickDay={(date: Date) => setCalendarRescheduleDate(date)}
                      minDate={new Date()}
                      value={calendarRescheduleDate || (booking.date ? new Date(booking.date) : new Date())}
                      className="bg-black/20 border border-purple-500/30 rounded-lg p-4 text-gray-900 dark:text-gray-100 calendar-dark-text mx-auto"
                    />
                  </div>
                  <div>
                    <div className="text-purple-300 font-semibold mb-3 text-center">
                      Choose your cosmic hour:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <Button
                          key={slot}
                          variant={rescheduleTimeSlot === slot ? "default" : "outline"}
                          className={`${
                            rescheduleTimeSlot === slot
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                          } transition-all duration-300`}
                          onClick={() => setRescheduleTimeSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => handleRescheduleBooking(booking, calendarRescheduleDate, rescheduleTimeSlot)}
                      disabled={!calendarRescheduleDate || !rescheduleTimeSlot || modalLoading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Confirm Ritual
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRescheduleBookingId(false);
                        setCalendarRescheduleDate(null);
                        setRescheduleTimeSlot("");
                      }}
                      className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelBooking(booking)}
                    disabled={modalLoading}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Cancel Reading
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRescheduleBookingId(booking.id);
                      setCalendarRescheduleDate(booking.date ? new Date(booking.date) : new Date());
                      setRescheduleTimeSlot(booking.timeSlot || "");
                    }}
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
