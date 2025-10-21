import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { RotatingText } from '@/components/ui/shadcn-io/rotating-text';
// import TypingText from '@/components/ui/shadcn-io/typing-text';


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
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text leading-tight">
          <span className="block">Practice Thinking <em>Out Loud </em> </span>
          {/* <span className="block text-3xl md:text-5xl font-semibold text-[hsl(0,0%,85%)]">
            Turn any LeetCode problem <br /> into a mock interview
          </span> */}
        </h1>
        {/* <div className="flex items-center justify-center min-h-screen w-full">
          <TypingText 
            text={["Beautiful components for React", "Built with shadcn/ui", "Ship faster than ever!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            className="text-4xl font-bold text-center max-w-2xl"
            cursorClassName="h-12"
            textColors={['#3b82f6', '#8b5cf6', '#06b6d4']}
            variableSpeed={{ min: 50, max: 120 }}
          />
        </div> */}
          {/* <p className="text-xl text-[hsl(0,0%,70%)] max-w-2xl">
            ELeet's interview AI platform provides automated interview practice, real-time feedback, and personalized coaching for technical interviews.
          </p> */}
          <p className="text-xl text-[hsl(0,0%,70%)] max-w-2xl">
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
      </div>
    </div>
  );
}
