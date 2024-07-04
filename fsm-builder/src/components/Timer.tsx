import React from 'react';

interface TimerProps {
  timer: number | null;
  nextStateName: string | null;
}

const Timer: React.FC<TimerProps> = ({ timer, nextStateName }:TimerProps) => {
  return (
    <>
      {timer !== null && nextStateName !== null && (
        <div className="timer alert alert-info">
          Next transition to <strong>{nextStateName}</strong> in: {timer} seconds
        </div>
      )}
    </>
  );
};

export default Timer;
