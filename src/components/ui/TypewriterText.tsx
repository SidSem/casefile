import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per char
  onComplete?: () => void;
  className?: string;
  cursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 20,
  onComplete,
  className = '',
  cursor = true,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsFinished(false);
    let index = 0;

    const timer = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayed(text.slice(0, index));
      } else {
        clearInterval(timer);
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !isFinished && (
        <span className="inline-block w-2 h-4 bg-evidence-red ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
};
