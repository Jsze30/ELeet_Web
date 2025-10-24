import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * JSX version — drop this into a .jsx file.
 * Requires Tailwind CSS and Framer Motion.
 *
 * Fixes & tweaks:
 * - No skipped characters: switched from setInterval to a recursive setTimeout "typeNext".
 * - Role-aware typing bubble (AI/User) for alignment, color, and label.
 * - Longer pacing between messages (pre-typing delay + post-typing pause).
 */
export default function ConversationChat() {
  const script = useMemo(
    () => [
      { role: "ai", text: "Hey there! Ready to dive into another LeetCode challenge today?" },
      { role: "user", text: "Yeah, let’s go with “Two Sum.” I’ve seen it before but I want to explain it better this time." },
      { role: "ai", text: "Perfect pick. It’s a classic. So, how would you start approaching the problem?" },
      { role: "user", text: "I’d probably loop through the array and store each value’s complement in a hashmap as I go." },
      { role: "ai", text: "Nice, that’s efficient. Why do you prefer the hashmap over a brute force approach?" },
      { role: "user", text: "Because the brute force method would check all pairs and take O(n²) time, while the hashmap brings it down to O(n)." },
      { role: "ai", text: "Exactly. You’re trading extra space for speed, which is a common tradeoff. What edge cases would you keep in mind?" },
      { role: "user", text: "Maybe duplicate numbers or cases where no valid pair exists. I’d need to make sure the hashmap doesn’t overwrite the index too early." },
      { role: "ai", text: "Great observation. That kind of attention to detail really strengthens your explanation. Want to try walking through an example next?" },
    ],
    []
  );

  const [rendered, setRendered] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [idx, setIdx] = useState(0);

  const scrollRef = useRef(null);
  const timeoutsRef = useRef([]);

  const BASE_INTERVAL = 28; // ms per character (slower so it reads clearly)
  const PRE_DELAY_FIRST = 500; // ms before 1st message starts typing
  const PRE_DELAY = 900; // ms before subsequent messages start typing
  const COMMIT_PAUSE = 650; // ms after message finishes before committing/next

  // Helper to clear all scheduled timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [rendered, typingText, isTyping]);

  // Sequenced typing animation per message
  useEffect(() => {
    if (idx >= script.length) return; // finished

    const msg = script[idx];

    // Start typing after a pre-delay
    const startId = setTimeout(() => {
      setIsTyping(true);
      setTypingText("");

      const chars = Array.from(msg.text);

      // Recursive typer to avoid race conditions and skipped chars
      const typeNext = (i) => {
        const id = setTimeout(() => {
          setTypingText((prev) => prev + (chars[i] ?? ""));
          if (i + 1 < chars.length) {
            typeNext(i + 1);
          } else {
            // after finishing the message, pause, then commit
            const commitId = setTimeout(() => {
              setIsTyping(false);
              setRendered((prev) => [...prev, { role: msg.role, text: msg.text }]);
              setTypingText("");
              setIdx((k) => k + 1);
            }, COMMIT_PAUSE);
            timeoutsRef.current.push(commitId);
          }
        }, BASE_INTERVAL);
        timeoutsRef.current.push(id);
      };

      // kick off typing at the first character
      if (chars.length > 0) typeNext(0);
      else {
        // empty message fallback
        const commitId = setTimeout(() => {
          setIsTyping(false);
          setRendered((prev) => [...prev, { role: msg.role, text: msg.text }]);
          setIdx((k) => k + 1);
        }, COMMIT_PAUSE);
        timeoutsRef.current.push(commitId);
      }
    }, idx === 0 ? PRE_DELAY_FIRST : PRE_DELAY);

    timeoutsRef.current.push(startId);

    return () => {
      clearAllTimeouts();
    };
  }, [idx, script]);

  const currentRole = idx < script.length ? script[idx].role : "ai";

  const bubbleAlign = (role) => (role === "ai" ? "justify-start" : "justify-end");
  const bubbleClasses = (role) =>
    role === "ai"
      ? "bg-neutral-800 text-gray-200 rounded-bl-sm"
      : "bg-amber-500/20 text-amber-200 rounded-br-sm text-right";
  const roleLabelClass = (role) => (role === "ai" ? "text-blue-400" : "text-amber-400");

  return (
    <div className="w-3/5 p-6 border-r border-neutral-800 space-y-4">
      <h2 className="text-lg font-semibold text-gray-300">Conversation</h2>

      {/* Chat container: fixed height + scrollable */}
      <div
        ref={scrollRef}
        className="h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
        aria-live="polite" role="log"
      >
        <div className="space-y-4 text-sm leading-relaxed">
          <AnimatePresence initial={false}>
            {rendered.map((m, i) => (
              <motion.div
                key={`${m.role}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className={`flex ${bubbleAlign(m.role)}`}
              >
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-[0.95rem] shadow-sm ${bubbleClasses(m.role)}`}>
                  <span className={`block font-semibold mb-0.5 ${roleLabelClass(m.role)}`}>
                    {m.role === "ai" ? "AI:" : "User:"}
                  </span>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing bubble while current message is being typed */}
          {isTyping && idx < script.length && (
            <div className={`flex ${bubbleAlign(currentRole)}`}>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-[0.95rem] ${bubbleClasses(currentRole)}`}
              >
                <span className={`block font-semibold mb-0.5 ${roleLabelClass(currentRole)}`}>
                  {currentRole === "ai" ? "AI:" : "User:"}
                </span>
                <TypingText text={typingText} />
                <TypingDots />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingText({ text }) {
  return <span>{text}</span>;
}

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1 ml-2 align-middle">
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-gray-400/80"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
      />
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-gray-400/70"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-gray-400/60"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}
