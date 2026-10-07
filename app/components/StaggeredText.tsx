'use client';
import { motion } from 'framer-motion';

export default function StaggeredText({
  text,
  gradientWords = [],
  startIndex = 0,
}: {
  text: string;
  gradientWords?: number[];
  startIndex?: number;
}) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => {
        const isGradient = gradientWords.includes(i);
        return (
          <span
            key={i}
            className="inline-block mr-[0.2em] last:mr-0 align-bottom overflow-hidden"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <motion.span
              initial={{ y: 40, opacity: 0, rotate: 4 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.85,
                delay: (startIndex + i) * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block will-change-transform ${isGradient ? 'gradient-text' : ''}`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </>
  );
}