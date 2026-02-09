import { PricingTable } from '@clerk/clerk-react'
import { useState } from 'react'
import GlassSurface from "../components/GlassSurface";
import { Button } from "../components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { List, X } from "@phosphor-icons/react";
import FloatingLines from '@/components/FloatingLines';

export default function PricingScreen() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      {/* FloatingLines background */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          inset: 0,
          zIndex: 0,
        }}
      >
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 pt-40 md:pt-48">
        <GlassSurface
          style={{
            position: "fixed",
            top: "1.5rem",
            zIndex: 100,
          }}
          className="!w-[92%] md:!w-[60%]"
          width="60%"
          height="8vh"
          borderRadius={30}
          backgroundOpacity={0.1}
        >
          <div
            className="w-full h-full flex justify-between items-center px-4 py-2 md:px-6"
          >
            <div className="flex items-center gap-2 md:gap-4">
              <a href="/">
                <button
                  className="flex items-center gap-2"
                >
                  <img
                    src="/ELeet_logo.png"
                    alt="ELeet logo"
                    className="h-7 w-7 md:h-9 md:w-9"
                  />
                  <span className="text-lg md:text-2xl text-white/95 font-bold">ELeet</span>
                </button>
              </a>
              <a href="/pricing" className="hidden md:block">
                <Button
                  variant="ghost"
                  className="text-white/95 hover:bg-white/10 hover:text-white/95 rounded-full text-sm md:text-base px-3 md:px-4"
                >
                  Pricing
                </Button>
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 md:gap-2">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-white/95 hover:bg-white/10 hover:text-white/95 rounded-full text-sm md:text-base px-3 md:px-4"
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant="outline"
                    className="border-white/20 bg-transparent backdrop-blur-md hover:bg-white/10 hover:text-white/95 rounded-full text-sm md:text-base px-3 md:px-4"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            {/* Mobile Menu - Hidden but with UserButton visible */}
            <div className="md:hidden flex items-center gap-2">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white/95 hover:text-white/70 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </GlassSurface>

        {/* Mobile Menu - Fixed positioning */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed top-24 left-0 right-0 z-50 mx-auto w-[92%] bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-0"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: '92%',
            }}
          >
            <a href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full text-left text-white/95 hover:bg-white/10 hover:text-white/95 rounded-lg text-sm py-3"
              >
                Pricing
              </Button>
            </a>
            <div className="border-t border-white/30"></div>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white/95 hover:bg-white/10 hover:text-white/95 rounded-lg text-sm py-3"
                >
                  Log In
                </Button>
              </SignInButton>
              <div className="border-t border-white/30"></div>
              <SignUpButton>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white/95 hover:bg-white/10 hover:text-white/95 rounded-lg text-sm py-3"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        )}
    
        <div className="w-full max-w-4xl px-4 pb-12 md:pb-0">
          <div className="text-center mb-8 px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-2 leading-tight">
              <span className="text-white">Simple Pricing. </span>
              <span className="text-gray-400">Start for Free</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
              Choose the perfect plan for your needs
            </p>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
            <PricingTable />
          </div>
        </div>
      </div>
    </>
  )
}