// Import React and required hooks
import React, { useEffect } from 'react';

declare global {
  interface Window {
    Telegram: any;
  }
}

// Access the Telegram Mini App WebApp object from the global window
const tele = window.Telegram.WebApp;

function App() {
  // When the component mounts, signal that the Telegram WebApp is ready
  useEffect(() => {
    tele.ready(); // This tells Telegram that the Mini App has loaded successfully
  }, []);

  // No UI is needed; this component is purely for initializing Telegram WebApp
  return null;
}

export default App;
