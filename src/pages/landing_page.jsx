import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar/Header */}
      <header className="w-full py-4 px-6 border-b border-[hsl(0,0%,10%)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl text-white font-bold">
            ELeet
          </div>
          
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" className="text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-purple-500 hover:bg-purple-600 text-black">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-start text-center space-y-8 my-12 py-12 min-h-[60vh]">
        <h1 className="text-7xl font-bold text-[hsl(0,0%,95%)]">
          Practice Thinking <em>Out Loud </em>
          {/* Turn any Leetcode Problem <br /> into a Mock Interview */}
        </h1>
        <p className="text-xl pt-2 text-[hsl(0,0%,70%)] max-w-2xl">
          Turn any LeetCode problem into a mock interview instantly, with real-time feedback and personalized coaching
        </p>
        <div className="flex gap-4">
          <a 
            href="https://chromewebstore.google.com/detail/eleet/hminpnlbphfcnbcfolmepecfkkhohpkd" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-purple-500 hover:bg-purple-600 text-black">
              Get The Extension
            </Button>
          </a>
          <a 
              href="https://discord.gg/gEnunRG3uF" 
              target="_blank" 
              rel="noopener noreferrer"
          >
              <Button
              variant="ghost"
              className="text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]"
              > 
              Join Our Discord
            </Button>
          </a>
        </div>
      </div>

      {/* Video Animation */}
      <div className="flex justify-center px-4 pb-12">
        <div className="max-w-[60%] rounded-lg overflow-hidden border-[hsl(0,0%,30%)] border">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto"
          >
            <source src="/Eleet_landing_demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>  
      </div>
    </div>
  );
}
