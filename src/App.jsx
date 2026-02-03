import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing_page";
import PricingScreen from "./pages/pricing";
import "./styles/App.css";
import { ClerkProvider } from '@clerk/clerk-react'
import { Analytics } from "@vercel/analytics/react"

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

export default function App() {
  return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<PricingScreen />} />
          </Routes>
          <Analytics />
        </div>
      </ClerkProvider>
  );
}