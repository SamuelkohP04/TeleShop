// LoginCard.tsx
"use client"

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { format } from "date-fns";

type FormData = {
  email: string;
  password: string;
  fullname: string;
  username: string;
  phone: string;
  dob: Date | null;
};

function LoginCard() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  // Remove error state, use toast instead


  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullname: "",
    username: "",
    phone: "",
    dob: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, dob: value ? new Date(value) : null }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN FLOW
        try {
          const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
          // Check if email is verified
          if (!userCredential.user.emailVerified) {
            toast({
              title: "Email Not Verified",
              description: "Please verify your email before logging in.",
              variant: "destructive",
            });
            await auth.signOut();
            return;
          }
          const idToken = await userCredential.user.getIdToken();
          // Fetch user profile from server
          const res = await fetch("/api/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${idToken}` },
          });
          if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error || "Unknown error");
          }
          const profile = await res.json();
          // Redirect based on admin status
          if (profile.isAdmin) {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        } catch (authError: any) {
          // Handle specific Firebase auth errors
          if (authError.code === 'auth/user-not-found') {
            throw new Error("No account found with this email. Please sign up first or try Google sign-in if you used that method.");
          } else if (authError.code === 'auth/wrong-password') {
            throw new Error("Incorrect password. If you signed up with Google, please use Google sign-in instead.");
          } else if (authError.code === 'auth/invalid-credential') {
            throw new Error("Invalid credentials. If you signed up with Google, please use Google sign-in instead.");
          } else {
            throw authError;
          }
        }
      } else {
        // REGISTER FLOW
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Create Firestore user profile immediately after registration
        const idToken = await userCredential.user.getIdToken();
        const res = await fetch("/api/createProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            fullname: formData.fullname,
            username: formData.username,
            dob: formData.dob ? formData.dob.toISOString() : null,
            phone: formData.phone,
            email: formData.email,
          }),
        });
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error || "Unknown error");
        }
        // Send verification email using Firebase API
        await auth.updateCurrentUser(userCredential.user);
        await auth.currentUser?.reload();
        await sendEmailVerification(userCredential.user);
        toast({
          title: "Verify Your Email",
          description: "A verification email has been sent. Please check your inbox and verify before logging in.",
          variant: "default",
        });
        // Sign out the user after registration
        await auth.signOut();
        setIsLogin(true); // Switch to login form
        return;
      }
    } catch (err: unknown) {
      toast({
        title: "Authentication Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br px-4">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button variant="outline" onClick={() => router.push("/")}>
          ← Back
        </Button>
      </div>
  
      {/* Card stays untouched */}
      <Card className="w-full max-w-md flex flex-col bg-slate-100 border-0 rounded p-4 gap-4 opacity-90 shadow-md">
        <CardHeader>
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-4xl font-bold">🌱 Awareness Living</h1>
            <h1 className="text-2xl font-semibold">{isLogin ? "Login" : "Register"}</h1>
          </div>
        </CardHeader>
  
        <CardContent className="flex flex-col gap-4">
          <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={loading} />
          <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} disabled={loading} />
  
          {!isLogin && (
            <>
              <Input name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} disabled={loading} />
              <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} disabled={loading} />
              <label className="text-left text-gray-700 text-sm font-semibold">Date of Birth</label>
              <Input
                name="dob"
                type="date"
                value={formData.dob ? format(formData.dob, "yyyy-MM-dd") : ""}
                onChange={handleDateChange}
                disabled={loading}
              />
              <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} disabled={loading} />
            </>
          )}
        </CardContent>
  
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 bg-white border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const provider = new GoogleAuthProvider();
                const userCredential = await signInWithPopup(auth, provider);
                const idToken = await userCredential.user.getIdToken();
                
                // Always try to fetch profile first to check if user exists
                const profileRes = await fetch("/api/profile", {
                  method: "GET",
                  headers: { Authorization: `Bearer ${idToken}` },
                });
                
                if (!profileRes.ok) {
                  // User doesn't exist in Firestore, create profile
                  const createRes = await fetch("/api/createProfile", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({
                      fullname: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || "User",
                      username: userCredential.user.email,
                      dob: null,
                      phone: userCredential.user.phoneNumber,
                      email: userCredential.user.email,
                    }),
                  });
                  if (!createRes.ok) {
                    throw new Error("Failed to create user profile");
                  }
                  router.push("/dashboard");
                } else {
                  // User exists, check if admin and redirect accordingly
                  const profile = await profileRes.json();
                  if (profile.isAdmin) {
                    router.push("/admin");
                  } else {
                    router.push("/dashboard");
                  }
                }
              } catch (err: unknown) {
                let errorMessage = (err as Error).message;
                
                // Handle specific Google sign-in errors
                if (err.code === 'auth/account-exists-with-different-credential') {
                  errorMessage = "An account already exists with this email using a different sign-in method. Please try signing in with email and password instead.";
                } else if (err.code === 'auth/popup-closed-by-user') {
                  errorMessage = "Sign-in was cancelled. Please try again.";
                } else if (err.code === 'auth/popup-blocked') {
                  errorMessage = "Pop-up was blocked by your browser. Please allow pop-ups and try again.";
                }
                
                toast({
                  title: "Google Sign-In Error",
                  description: errorMessage,
                  variant: "destructive",
                });
              } finally {
                setLoading(false);
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2"><g><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.9 0 5.4 1 7.4 2.6l6.2-6.2C34.1 5.5 29.4 3.5 24 3.5 12.8 3.5 3.5 12.8 3.5 24S12.8 44.5 24 44.5c11.1 0 20.5-9 20.5-20.5 0-1.4-.1-2.7-.4-4z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.9 0 5.4 1 7.4 2.6l6.2-6.2C34.1 5.5 29.4 3.5 24 3.5c-7.2 0-13.4 3.7-17.1 9.2z"/><path fill="#FBBC05" d="M24 44.5c5.4 0 10.1-1.8 13.6-4.9l-6.3-5.2c-2.1 1.5-4.8 2.4-7.3 2.4-5.6 0-10.3-3.7-12-8.8l-6.6 5.1C6.1 40.3 14.3 44.5 24 44.5z"/><path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.9 0 5.4 1 7.4 2.6l6.2-6.2C34.1 5.5 29.4 3.5 24 3.5 12.8 3.5 3.5 12.8 3.5 24S12.8 44.5 24 44.5c11.1 0 20.5-9 20.5-20.5 0-1.4-.1-2.7-.4-4z"/></g></svg>
            Continue with Google
          </Button>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} disabled={loading}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
  
}

export default LoginCard;
