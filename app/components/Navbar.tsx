"use client";

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypewriterTitle: React.FC<{ text: string }> = ({ text }) => {
  const [typedText] = useTypewriter({
    words: [text],
    loop: 1,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCursor(false);
    }, 7000); // Set the cursor to stop blinking after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 style={styles.title}>
      {typedText}
      {showCursor && <Cursor cursorStyle='<' cursorColor='gold'/>}
    </h1>
  );
};

const AnimatedWords: React.FC<{ word: string }> = ({ word }) => {
  const [props, api] = useSpring(() => ({
    transform: 'translateY(100px)',
    opacity: 0,
    config: { tension: 100, friction: 20 },
  }));

  useEffect(() => {
    api.start({ transform: 'translateY(0)', opacity: 1 });
  }, [api]);

  return <animated.span style={{ ...styles.animatedWord, ...props }}>{word}</animated.span>;
};

const Navbar: React.FC = () => {
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    setShowWords(true);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <TypewriterTitle text="InvestiTrack" />
        {showWords && (
          <div style={styles.wordsContainer}>
            <AnimatedWords word="Asset Search" />
            <AnimatedWords word="Visualize Prices" />
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(to right, #0000FF, #5b0177)',
    padding: '20px',
    textAlign: 'center' as const,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  wordsContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '2em', 
    color: '#ffffff',
  },
  animatedWord: {
    fontSize: '1.5em',
    color: 'gold' 
  },
};

export default Navbar;
