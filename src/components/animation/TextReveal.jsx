import React from 'react';

const TextReveal = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-flex", overflow: "hidden", paddingBottom: "0.1em" }}>
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              style={{
                display: "inline-block",
                animation: `revealUp 0.5s cubic-bezier(0.21, 0.47, 0.32, 0.98) both`,
                animationDelay: `${delay + wordIndex * 0.04 + charIndex * 0.01}s`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
