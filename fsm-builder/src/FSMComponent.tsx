import React, { useEffect } from 'react';

export interface State {
  name: string;
  metadata?: any;
}

export interface Transition {
  from: string;
  to: string;
}

export interface FSMConfig {
  states: State[];
  transitions: Transition[];
}

export interface FSMProps {
  config: FSMConfig;
  currentState: string;
  onTransition: (nextState: string) => void;
  onCreateSuccess?: () => void;
}

const FSMComponent: React.FC<FSMProps> = ({
                                            config,
                                            currentState,
                                            onTransition,
                                            onCreateSuccess,
                                          }) => {
  useEffect(() => {
    if (onCreateSuccess) {
      onCreateSuccess();
    }
    // Empty dependency array to ensure this runs only once
  }, []);

  const isTransitionValid = (from: string, to: string): boolean => {
    return config.transitions.some((t) => t.from === from && t.to === to);
  };

  return (
    <div>
      <h3>Current State: {currentState}</h3>
      <div>
        <h4>All States:</h4>
        <ul>
          {config.states.map((state) => (
            <li key={state.name}>
              <button
                onClick={() => onTransition(state.name)}
                disabled={!isTransitionValid(currentState, state.name)}
                style={{ fontWeight: currentState === state.name ? 'bold' : 'normal' }}
              >
                {state.name} {currentState === state.name && '(Current)'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FSMComponent;
