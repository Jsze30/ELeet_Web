import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { RotatingText } from '@/components/ui/shadcn-io/rotating-text';





export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar/Header */}
      <header className="w-full py-4 px-6 border-b border-[hsl(0,0%,10%)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold bg-white text-transparent bg-clip-text">
              ELeet
            </div>
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
      
      <div className="container mx-auto px-4 py-12">        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 my-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text">
            Land your next 
            <RotatingText
              containerClassName="inline-block px-3 align-text-bottom min-w-[250px] text-left"
              className="text-gray-100"
              text={["Google", "Meta", "Netflix", "Amazon", "Apple", "Tesla", "Nvidia", "Stripe", "Airbnb"]}
              duration={3000}
              y={50}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />  <br/> offer with AI interviews
          </h1>
          <p className="text-xl text-[hsl(0,0%,70%)] max-w-2xl">
            ELeet's interview AI platform provides automated interview practice, real-time feedback, and personalized coaching for technical interviews.
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
            <Button
              variant="ghost"
              className="text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]"
              onClick={() => window.open('https://discord.gg/gEnunRG3uF', '_blank', 'noopener noreferrer')}
            >
              Join Our Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
