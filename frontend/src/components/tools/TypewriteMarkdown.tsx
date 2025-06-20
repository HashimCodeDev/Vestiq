//Typewriter of AI chat page

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function TypewriterMarkdown({
  text,
  speed = 20,
}: {
  text: string;
  speed?: number;
}) {
  const [visibleText, setVisibleText] = useState('');
  const [index, setIndex] = useState(0);
  const bottomRef = useRef<HTMLSpanElement>(null);

  // scroll on every character typed
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setVisibleText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  // 👇 Scroll after each render
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-jakarta whitespace-pre-wrap"
    >
      <ReactMarkdown>{visibleText}</ReactMarkdown>
      <span ref={bottomRef} />
    </motion.div>
  );
}
