import React from 'react';

interface CurrentStateProps {
  currentState: string;
}

const CurrentState: React.FC<CurrentStateProps> = ({ currentState }) => {
  return <h3 className="current-state card-title">Current State: {currentState}</h3>;
};

export default CurrentState;
