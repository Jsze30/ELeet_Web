import React from "react";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import ConversationChat from "@/components/ui/conversation-chat";
import { PencilLine, TerminalWindow } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar/Header */}
      <header className="w-full py-4 px-6 border-b border-[hsl(0,0%,10%)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl text-white font-bold">ELeet</div>

          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]"
                >
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
      <div className="flex flex-col items-center justify-center text-center space-y-8 my-12 py-12 min-h-[70vh]">
        <h1 className="text-7xl font-bold text-[hsl(0,0%,95%)]">
          Practice Thinking <em>Out Loud </em>
          {/* Turn any Leetcode Problem <br /> into a Mock Interview */}
        </h1>
        <p className="text-xl pt-2 text-[hsl(0,0%,70%)] max-w-2xl">
          Turn any LeetCode problem into a mock interview instantly, with
          real-time feedback and personalized coaching
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

      <div className="flex flex-col gap-20">
        {/* Video Animation */}
        <div className="flex justify-center pb-12">
          <motion.div
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 50px rgba(90,0,92,0.5)",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
            }}
            className="max-w-[60%] rounded-lg overflow-hidden cursor-pointer"
          >
            <video autoPlay loop muted playsInline className="w-full h-auto">
              <source src="/Eleet_landing_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        <motion.div
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 50px rgba(90,0,92,0.4)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
          }}
          className="mx-auto max-w-[60%] bg-[hsl(0,0%,5%)] text-white rounded-2xl shadow-lg flex overflow-hidden"
        >
          {/* Left Section (60%) - Conversation Transcript */}
          <ConversationChat />

          {/* Right Section (40%) - Title + Description + Bullets */}
          <div className="w-2/5 p-8 pr-4 pt-2 flex flex-col justify-center bg-[hsl(0,0%,10%)] text-left">
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-400 text-transparent bg-clip-text">
              Conversational Mock Technical Interviews Made{" "}
              <em className="bg-gradient-to-r from-orange-400 to-orange-200 text-transparent bg-clip-text">
                Easy
              </em>
            </h1>
            <p className="text-gray-400 mb-4">
              Turn any LeetCode problem into a realistic mock interview. Get
              instant feedback and improve your communication skills.
            </p>
            <div className="list-disc text-gray-400 space-y-2 text-left text-sm">
              <div className="bg-[hsl(270,95%,75%)] rounded-lg p-1">
                <p className="text-black">
                  Simulate live technical interviews anytime
                </p>
              </div>
              <div className="bg-[hsl(270,95%,78%)] rounded-lg p-1">
                <p className="text-black">
                  Receive AI-powered feedback tailored to you
                </p>
              </div>
              <div className="bg-[hsl(270,95%,81%)] rounded-lg p-1">
                <p className="text-black">
                  Build confidence and ace your next interview ⚡
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small Feature Highlight */}
        <div className="mx-auto w-[60%] gap-10 text-[hsl(0,0%,95%)] rounded-2xl shadow-lg flex overflow-hidden">
          {/* Personalized Feedback box */}
          <div className="w-1/2 bg-[hsl(0,0%,5%)] rounded-2xl p-6 shadow">
            <div className="flex justify-center mb-4 bg-gray">
              <PencilLine size={108} weight="duotone"/>
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Personalized Feedback
            </h3>
            <div className="flex flex-col gap-3 mt-6">
              <div className="bg-[hsl(0,0%,10%)] rounded-lg p-3">
                <p className="text-[hsl(0,0%,70%)] text-sm">
                  Targeted suggestions on problem approach and trade.
                </p>
              </div>
              <div className="bg-[hsl(0,0%,10%)] rounded-lg p-3">
                <p className="text-[hsl(0,0%,70%)] text-sm">
                  Clarity & communication tips to improve explanations.
                </p>
              </div>
              <div className="bg-[hsl(0,0%,10%)] rounded-lg p-3">
                <p className="text-[hsl(0,0%,70%)] text-sm">
                  Actionable next steps and practice prompts tailored to.
                </p>
              </div>
            </div>
          </div>
          {/* Live Code Review box */}
          <div className="w-1/2 bg-[hsl(0,0%,5%)] rounded-2xl p-6 h-[30%] shadow">
            <div className="flex justify-center mb-4">
              <TerminalWindow size={108} weight="duotone" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Live Code Review</h3>
            <div className="flex flex-col gap-3 mt-6">
              <div className="bg-[hsl(0,0%,10%)] rounded-lg p-3">
                <p className="text-[hsl(0,0%,70%)] text-sm">
                  Specific, actionable suggestions on algorithm choices
                </p>
              </div>
              <div className="bg-[hsl(0,0%,10%)] rounded-lg p-3">
                <p className="text-[hsl(0,0%,70%)] text-sm">
                  Communication tips to verbalize
                  reasoning
                </p>
              </div>
              <div className="bg-[hsl(0,0%,10%)] rounded-lg p-3">
                <p className="text-[hsl(0,0%,70%)] text-sm">
                  A personalized practice plan to strack progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
