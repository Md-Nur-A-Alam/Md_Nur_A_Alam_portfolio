import { useState, useEffect } from 'react';

export function useTypewriter(texts, typingSpeed = 55, deletingSpeed = 28, holdDuration = 2200) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing', 'holding', 'deleting'

  useEffect(() => {
    let timeout;
    const currentText = texts[index];

    if (phase === 'typing') {
      setIsTyping(true);
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase('holding');
        }, holdDuration);
      }
    } else if (phase === 'holding') {
      setIsTyping(false);
      timeout = setTimeout(() => {
        setPhase('deleting');
      }, holdDuration);
    } else if (phase === 'deleting') {
      setIsTyping(true);
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIndex((prev) => (prev + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, index, texts, typingSpeed, deletingSpeed, holdDuration]);

  return { displayText, isTyping };
}
