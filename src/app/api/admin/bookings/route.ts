import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    
    const idToken = match[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    
    const db = getFirestore();
    
    // First, verify the user is an admin
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists || !userDoc.data()?.isAdmin) {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 });
    }
    
    // Fetch all bookings
    const bookingsSnapshot = await db.collection("bookings").orderBy("date", "desc").get();
    const bookings = [];
    
    for (const doc of bookingsSnapshot.docs) {
      const bookingData = doc.data();
      
      // Fetch user profile for each booking
      let userProfile = null;
      try {
        const userDoc = await db.collection("users").doc(bookingData.uid).get();
        if (userDoc.exists) {
          userProfile = {
            uid: bookingData.uid,
            ...userDoc.data()
          };
        }
      } catch (error) {
        console.error("Error fetching user profile for booking:", error);
      }
      
      bookings.push({
        id: doc.id,
        ...bookingData,
        userProfile
      });
    }
    
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error: any) {
    console.error("Admin bookings API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
