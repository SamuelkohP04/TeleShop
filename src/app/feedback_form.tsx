"use client"; // NextJS 13 requires this. Remove if you are using NextJS 12 or lower
import { useEffect } from "react";
import Script from "next/script";

interface FeaturebaseFunction {
  (command: string, options: Record<string, unknown>): void;
  q?: unknown[];
}

interface WindowWithFeaturebase extends Window {
  Featurebase?: FeaturebaseFunction;
}

export const ReportBugFeedbackForm = () => {
  useEffect(() => {
    const win = window as WindowWithFeaturebase;

    console.log("Initializing Featurebase widget...");

    // Wait for the script to load before initializing
    const initializeWidget = () => {
      if (typeof win.Featurebase !== "function") {
        console.log("Featurebase not loaded yet, retrying...");
        setTimeout(initializeWidget, 100);
        return;
      }

      console.log("Featurebase loaded, initializing widget...");
      
      try {
        win.Featurebase("initialize_feedback_widget", {
          organization: "awarenessliving", // Using demo organization for testing
          theme: "light",
          placement: "right", // This creates the floating button
          email: "gunplasamgaming@gmail.com", // optional
          // defaultBoard: "Awareness Living", // Comment out for now
          locale: "en", // Change the language, view all available languages from https://help.featurebase.app/en/articles/8879098-using-featurebase-in-my-language 
          metadata: null // Attach session-specific metadata to feedback. Refer to the advanced section for the details: https://help.featurebase.app/en/articles/3774671-advanced#7k8iriyap66
        });
        console.log("Featurebase widget initialized successfully");
        
        // Check if widget was created
        setTimeout(() => {
          const widget = document.querySelector('[data-featurebase-widget]');
          console.log("Widget element found:", widget);
          if (!widget) {
            console.warn("Widget element not found in DOM. This might mean:");
            console.warn("1. Organization 'awarenessliving' doesn't exist in Featurebase");
            console.warn("2. No board named 'Awareness Living' exists");
            console.warn("3. Check your Featurebase workspace setup");
          }
        }, 2000);
        
      } catch (error) {
        console.error("Error initializing Featurebase widget:", error);
      }
    };

    // Start initialization
    initializeWidget();
  }, []);

  return (
    <>
      <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
      <div>
        {/*If you wish to open the widget using your own button you can do so here.
           To get rid of our floating button, remove 'placement' from the Featurebase('initialize_feedback_widget') call above.
          */} 
      </div>
    </>
  );
};

export default ReportBugFeedbackForm;