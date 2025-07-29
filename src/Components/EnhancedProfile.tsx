"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Crown,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Star,
  Clock,
  CheckCircle,
  Settings,
  Bell,
  Lock,
  ArrowLeft,
  Gem,
  Moon,
  Sun,
  Sparkles,
  Eye,
} from "lucide-react";

interface ProfileData {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  dob: any;
  createdAt: any;
  paymentPlan: string;
  profileImage?: string;
}

export default function EnhancedProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  const handleUpgrade = async () => {
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();
      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch profile");
      }
      const data = await res.json();
      setProfile(data);
      setEditData({
        fullname: data.fullname || "",
        username: data.username || "",
        dob:
          data.dob && data.dob._seconds
            ? format(new Date(data.dob._seconds * 1000), "yyyy-MM-dd")
            : "",
        phone: data.phone || "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fullname: editData.fullname,
          username: editData.username,
          dob: editData.dob ? new Date(editData.dob).toISOString() : null,
          phone: editData.phone,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to update profile");
      }
      setSuccessMsg("Profile updated successfully!");
      setEditMode(false);
      fetchProfile();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (ts: any) => {
    if (!ts) return "-";
    if (typeof ts === "string") return new Date(ts).toLocaleDateString();
    if (ts._seconds) return new Date(ts._seconds * 1000).toLocaleDateString();
    if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleDateString();
    return "-";
  };

  const getPlanBadge = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case "premium":
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        );
      case "pro":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Shield className="w-3 h-3 mr-1" />
            Free
          </Badge>
        );
    }
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "url(/DashboardPage/seamless-starry-pattern.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80"></div>
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
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage: "url(/DashboardPage/seamless-starry-pattern.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80"></div>
        <div className="relative text-center p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl">
          <Eye className="h-16 w-16 text-red-400 mx-auto mb-4 animate-pulse" />
          <div className="text-red-400 text-lg mb-6">{error}</div>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Portal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(/DashboardPage/seamless-starry-pattern.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80"></div>

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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Mystical Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl"
        >
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Button>
            <div className="flex items-center space-x-3">
              <Gem className="h-10 w-10 text-purple-300 animate-pulse" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Spiritual Profile
                </h1>
                <p className="text-purple-200/70 text-sm">
                  Manage your cosmic identity and sacred preferences
                </p>
              </div>
            </div>
          </div>
          {profile?.paymentPlan !== "premium" && (
            <Button
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
            >
              <Crown className="h-4 w-4 mr-2" />
              Ascend to Enlightenment
            </Button>
          )}
        </motion.div>

        {/* Success Message */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {successMsg}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-purple-100">
                      <AvatarImage src={profile?.profileImage} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                        {getInitials(
                          profile?.fullname || profile?.username || "User"
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-2 border-purple-200 hover:bg-purple-50"
                      variant="outline"
                    >
                      <Camera className="w-4 h-4 text-purple-600" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-lg">
                    {profile?.fullname || profile?.username}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{profile?.email}</p>
                  {getPlanBadge(profile?.paymentPlan || "free")}
                </div>

                <nav className="space-y-2">
                  {[
                    { id: "profile", label: "Profile Info", icon: User },
                    { id: "security", label: "Security", icon: Lock },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "preferences", label: "Preferences", icon: Settings },
                  ].map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "hover:bg-purple-50"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === "profile" && (
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-500" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant={editMode ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (editMode) {
                        setEditMode(false);
                        setEditData({
                          fullname: profile?.fullname || "",
                          username: profile?.username || "",
                          dob:
                            profile?.dob && profile.dob._seconds
                              ? format(
                                  new Date(profile.dob._seconds * 1000),
                                  "yyyy-MM-dd"
                                )
                              : "",
                          phone: profile?.phone || "",
                        });
                      } else {
                        setEditMode(true);
                      }
                    }}
                  >
                    {editMode ? (
                      <X className="w-4 h-4 mr-1" />
                    ) : (
                      <Edit3 className="w-4 h-4 mr-1" />
                    )}
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      {editMode ? (
                        <Input
                          name="fullname"
                          value={editData.fullname}
                          onChange={handleEditChange}
                          className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {profile?.fullname || "-"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Username
                      </label>
                      {editMode ? (
                        <Input
                          name="username"
                          value={editData.username}
                          onChange={handleEditChange}
                          className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {profile?.username || "-"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center justify-between">
                        <span>{profile?.email}</span>
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </label>
                      {editMode ? (
                        <Input
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                          className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {profile?.phone || "-"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date of Birth
                      </label>
                      {editMode ? (
                        <Input
                          name="dob"
                          type="date"
                          value={editData.dob}
                          onChange={handleEditChange}
                          className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {formatDate(profile?.dob)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Member Since
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {formatDate(profile?.createdAt)}
                      </div>
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-500" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Password
                    </h3>
                    <p className="text-yellow-700 text-sm mb-3">
                      Last changed 3 months ago
                    </p>
                    <Button
                      variant="outline"
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    >
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-500" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Booking Confirmations</h4>
                        <p className="text-sm text-gray-600">
                          Get notified when bookings are confirmed
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Marketing Updates</h4>
                        <p className="text-sm text-gray-600">
                          Receive updates about new services and offers
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Disable
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "preferences" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    Account Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Theme Preference</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Light
                        </Button>
                        <Button variant="outline" size="sm">
                          Dark
                        </Button>
                        <Button variant="outline" size="sm">
                          Auto
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Language</h4>
                      <Button variant="outline" size="sm">
                        English (US)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
