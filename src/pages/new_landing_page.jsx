import Orb from "../components/Orb";
import GlassSurface from "../components/GlassSurface";
import { Button } from "../components/ui/button";
import {
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { DiscordLogoIcon, CaretDownIcon } from "@phosphor-icons/react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import ConversationChat from "../components/ui/conversation-chat copy";

export default function NewLandingPage() {
  const { openWaitlist } = useClerk();

  const handleJoinWaitlist = () => {
    openWaitlist();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "105vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Orb
        hoverIntensity={3.5}
        rotateOnHover={true}
        hue={620}
        forceHoverState={false}
        brightness={0.9}
      />
      <GlassSurface
        style={{
          position: "fixed",
          top: "1.5rem",
          zIndex: 100,
        }}
        className="!w-[92%] md:!w-[60%]"
        width="60%"
        height="8vh"
        borderRadius={20}
        backgroundOpacity={0.1}
      >
        <div
          className="w-full h-full flex justify-between items-center px-4 py-2 md:px-6"
        >
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center gap-2"
          >
            <img
              src="/ELeet_logo.png"
              alt="ELeet logo"
              className="h-7 w-7 md:h-9 md:w-9"
            />
            <span className="text-xl md:text-2xl text-white/95 font-bold">ELeet</span>
          </button>
          <div className="flex items-center gap-1 md:gap-2">
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
        </div>
      </GlassSurface>

      {/* Hero Section */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white/95">
          10x Your LeetCode Prep
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Start performing.
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-1.5xl text-white/70 mb-10 max-w-2xl mx-auto">
          Practice with a live AI interviewer anytime, on any leetcode problem.
          <br />
          Make mistakes now. Nail the real technical interview.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="border-white/30 bg-white/10 backdrop-blur-md hover:text-white/70 hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 text-base md:text-lg px-10 py-6 rounded-full font-semibold"
            onClick={handleJoinWaitlist}
          >
            Join the waitlist
          </Button>
          <a
            href="https://discord.gg/gEnunRG3uF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordLogoIcon size={32} weight="duotone" color="#626DEF" />
          </a>
        </div>
      </div>
      {/* Learn More Section */}
      <div
        style={{
          position: "absolute",
          bottom: "8rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          textAlign: "center",
        }}
      >
        <button
          className="flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors cursor-pointer"
          onClick={() => {
            window.scrollBy({
              top: 500,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-sm">Learn more</span>
          <CaretDownIcon size={20} weight="bold" />
        </button>
      </div>

      {/* Feature 1 - Structured for FAANG */}
      <div
        style={{
          position: "absolute",
          top: "105vh",
          width: "100%",
          padding: "4rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          alignItems: "center",
          background: "hsl(0,0%,8%)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white/95 mb-4">
            Designed to mirror the FAANG experience
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Simulate a live technical interview with an AI that asks structured,{" "}
            <br /> in-depth questions and follow ups just like a FAANG
            interviewer.
          </p>
        </div>

        {/* Conversation Demo */}
        <div
          style={{
            background: "black",
            width: "60%",
            borderRadius: "1.5rem",
            boxShadow: "0 0 40px rgba(255,165,0,0.3)",
          }}
        >
          <ConversationChat />
        </div>
      </div>

      {/* Feature 2 - Built into Leetcode */}
      <div
        style={{
          position: "absolute",
          top: "200vh",
          width: "100%",
          // height: '100vh',
          // background: 'hsl(0,0%,8%)',
          padding: "5vh",
        }}
      >
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl font-semibold text-white/95 m-4">
                your voice AI interviewer that lives in LeetCode and takes
                <br />
                <span className="text-[4rem] font-bold mt-1 leading-none bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  30 seconds to set up
                </span>
              </h2>
            </>
          }
        >
          <img
            src={`/Eleet_preview.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      {/* Feature 3 - Live code reading */}
      {/* Feature 4 - Personalized feedback */}
      <div
        className="absolute w-full px-4 py-16 md:px-24 md:py-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center"
        style={{
          top: "310vh",
        }}
      >
        <div className="text-center md:text-start max-w-[500px] flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white/95 mb-4">
            Personalized feedback to turn you into the <em>top 1%</em> candidate
          </h2>
          <p className="text-base md:text-xl text-white/70">
            Become better than 99% of candidates with detailed feedback on your
            performance, including problem-solving skills, communication, and
            code efficiency.
          </p>
        </div>

        {/* Feedback report mock */}
        <div
          className="w-full max-w-[400px] md:w-[400px] flex-1 rounded-3xl p-6 md:p-8"
          style={{
            background: "black",
            boxShadow: "0 0 40px rgba(255,165,0,0.3)",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid rgba(255,165,0,0.2)",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white/95 mb-2">
              Interview Report
            </h3>
            <p className="text-white/60 text-sm md:text-base">LeetCode 1: Two Sum</p>
          </div>
          <div
            className="grid grid-cols-2 gap-4 md:gap-8"
          >
            <div>
              <p className="text-white/60 mb-1 text-sm md:text-base">Overall Score</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-400">8.5/10</p>
            </div>
            <div>
              <p className="text-white/60 mb-1 text-sm md:text-base">Time Complexity</p>
              <p className="text-orange-400 text-sm md:text-base">Optimal ✓</p>
            </div>
            <div>
              <p className="text-white/60 mb-1 text-sm md:text-base">Space Complexity</p>
              <p className="text-orange-400 text-sm md:text-base">O(n) - Good</p>
            </div>
            <div>
              <p className="text-white/60 mb-1 text-sm md:text-base">Communication</p>
              <p className="text-orange-400 text-sm md:text-base">Clear & concise</p>
            </div>
          </div>
          <div
            className="mt-6 md:mt-8 p-3 md:p-4 rounded-lg"
            style={{
              background: "rgba(255,165,0,0.05)",
            }}
          >
            <p className="text-white/70 text-xs md:text-sm">
              <strong className="text-orange-400">💡 Tip:</strong> Next time,
              explain your approach before coding to save time
            </p>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      {/* Pricing */}
      {/* FAQ */}
      {/* Final CTA Section */}
      <div
        style={{
          position: "absolute",
          top: "400vh",
          width: "100%",
          padding: "4rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          alignItems: "center",
          background: "hsl(0,0%,8%)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2 className="text-4xl md:text-3xl font-bold text-white/95 mb-6">
            Want in? We're giving early access to a select few
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Level up your interview game today and beat 99% of candidates.
          </p>
          <Button
            variant="outline"
            className="border-white/30 bg-white/10 backdrop-blur-md hover:text-white/70 hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 text-base md:text-lg px-10 py-6 rounded-full font-semibold"
            onClick={handleJoinWaitlist}
          >
            Join the waitlist
          </Button>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
}
