import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Mic, Upload, Copy, Download, Settings } from "lucide-react";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
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
            <Button variant="ghost" className="text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
              Log In
            </Button>
            <Button className="bg-orange-500 hover:opacity-90 text-black">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-12">        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 my-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text">
            The AI platform for<br />interview preparation
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
              <Button className="bg-orange-500 hover:opacity-90 text-black">
                Get The Extension
              </Button>
            </a>
            <Button variant="ghost" className="text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
