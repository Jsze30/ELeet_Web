import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConversationTranscript() {
  const script = useMemo(
    () => [
      { role: "ELeet", text: "Hey there! Ready to dive into another LeetCode challenge today?" },
      { role: "User", text: "Yeah, let’s go with “Two Sum.” I’ve seen it before but I want to explain it better this time." },
      { role: "ELeet", text: "Perfect pick. It’s a classic. So, how would you start approaching the problem?" },
      { role: "User", text: "I’d probably loop through the array and store each value’s complement in a hashmap as I go." },
      { role: "ELeet", text: "Nice, that’s efficient. Why do you prefer the hashmap over a brute force approach?" },
      { role: "User", text: "Because the brute force method would check all pairs and take O(n²) time, while the hashmap brings it down to O(n)." },
      { role: "ELeet", text: "Exactly. You’re trading extra space for speed, which is a common tradeoff. What edge cases would you keep in mind?" },
      { role: "User", text: "Maybe duplicate numbers or cases where no valid pair exists. I’d need to make sure the hashmap doesn’t overwrite the index too early." },
      { role: "ELeet", text: "Great observation. That kind of attention to detail really strengthens your explanation. Want to try walking through an example next?" },
    ],
    []
  );

  const [rendered, setRendered] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [idx, setIdx] = useState(0);
  const [clockStart] = useState(() => Date.now());

  const scrollRef = useRef(null);
  const timeoutsRef = useRef([]);

  const CHAR_INTERVAL = 34;
  const PRE_DELAY_FIRST = 800;
  const PRE_DELAY = 1100;
  const COMMIT_PAUSE = 900;

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [rendered, typingText, isTyping]);

  useEffect(() => {
    if (idx >= script.length) return;
    const msg = script[idx];
    const startId = setTimeout(() => {
      setIsTyping(true);
      setTypingText("");

      const chars = Array.from(msg.text);
      const typeNext = (i) => {
        const id = setTimeout(() => {
          setTypingText((prev) => prev + (chars[i] ?? ""));
          if (i + 1 < chars.length) {
            typeNext(i + 1);
          } else {
            const commitId = setTimeout(() => {
              setIsTyping(false);
              setRendered((prev) => [
                ...prev,
                { role: msg.role, text: msg.text, ts: formatTs(Date.now() - clockStart) },
              ]);
              setTypingText("");
              setIdx((k) => k + 1);
            }, COMMIT_PAUSE);
            timeoutsRef.current.push(commitId);
          }
        }, CHAR_INTERVAL);
        timeoutsRef.current.push(id);
      };
      if (chars.length > 0) typeNext(0);
      else {
        const commitId = setTimeout(() => {
          setIsTyping(false);
          setRendered((prev) => [
            ...prev,
            { role: msg.role, text: msg.text, ts: formatTs(Date.now() - clockStart) },
          ]);
          setIdx((k) => k + 1);
        }, COMMIT_PAUSE);
        timeoutsRef.current.push(commitId);
      }
    }, idx === 0 ? PRE_DELAY_FIRST : PRE_DELAY);

    timeoutsRef.current.push(startId);
    return () => clearAllTimeouts();
  }, [idx, script, clockStart]);

  const isFinished = idx >= script.length;
  const currentRole = isFinished ? "ELeet" : script[idx].role;

  return (
    <div className="w-3/5 p-6 border-r border-neutral-800 space-y-3 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-neutral-300">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600" />
          </span>
          Live conversation
        </span>
        <span className="text-neutral-600">•</span>
        <span className="font-medium">Now speaking: {currentRole}</span>
      </div>

      {/* Bounded region */}
      <div className="h-[48vh] min-h-0 flex flex-col space-y-3">
        {!isFinished && (
          <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 p-5">
            <div className="min-h-[96px] flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="popLayout">
                {isTyping && (
                  <motion.div
                    key="active-line"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <div className="text-xs uppercase tracking-wide text-neutral-400 mb-1">{currentRole}</div>
                    <div className="text-0.5xl md:text-0.5xl font-medium text-neutral-100 leading-relaxed">
                      {typingText || ""}
                      <Caret />
                    </div>
                    <EqBars />
                  </motion.div>
                )}
                {!isTyping && (
                  <motion.div
                    key="idle-prompt"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-400 text-sm"
                  >
                    Waiting for the next utterance
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Transcript */}
        <div
          ref={scrollRef}
          className={`pr-2 transition-all duration-300 ${
            isFinished
              ? "min-h-0 flex-1 overflow-y-auto no-scrollbar"
              : "h-[70%] overflow-hidden"
          }`}
          aria-live="polite"
          role="log"
        >
          <div className="divide-y divide-neutral-800">
            {rendered.map((m, i) => (
              <div key={`${m.role}-${i}`} className="grid grid-cols-[64px_1fr_auto] gap-3 py-3 items-start">
                <div className="text-xs tabular-nums text-neutral-500 leading-6">{m.ts}</div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-neutral-400">{m.role}</div>
                  <div className="text-sm text-neutral-200 leading-relaxed">{m.text}</div>
                </div>
                <div className="text-[10px] text-neutral-500">caption</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Utility components */
function formatTs(ms) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function Caret() {
  return (
    <span className="inline-block w-2 h-5 align-baseline ml-1">
      <span className="inline-block w-full h-full bg-neutral-200 animate-pulse opacity-70" />
    </span>
  );
}

function EqBars() {
  return (
    <div className="flex items-end justify-center gap-1 mt-3 h-6">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded bg-purple-600"
          animate={{ height: [8, 24, 10, 20, 12][i % 5] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 0.9 + i * 0.05,
            ease: "easeInOut",
          }}
          style={{ height: 8 + i * 2 }}
        />
      ))}
    </div>
  );
}