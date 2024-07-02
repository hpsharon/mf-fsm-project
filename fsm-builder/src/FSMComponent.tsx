import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import './FSMComponent.css';  // Import custom CSS for positioning

export interface State {
  name: string;
  metadata?: any;
}

export interface Transition {
  from: string;
  to: string;
  delay?: number; // Optional delay for transitions
}

export interface FSMConfig {
  states: State[];
  transitions: Transition[];
}

export interface FSMResetOptions {
  allowReset: boolean;
  onReset: () => void;
}

export interface FSMProps {
  config: FSMConfig;
  currentState: string;
  onTransition: (nextState: string) => void;
  onCreateSuccess?: () => void;
  resetOptions: FSMResetOptions;
  isAutomatic?: boolean; // Optional flag to make transitions automatic
}

const FSMComponent: React.FC<FSMProps> = (props: FSMProps) => {
  const { config, currentState, onTransition, onCreateSuccess, resetOptions, isAutomatic } = props;
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (onCreateSuccess) {
      onCreateSuccess();
    }
    // Clean up timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [onCreateSuccess, timeoutId]);

  useEffect(() => {
    const transition = config.transitions.find(t => t.from === currentState && t.delay);
    if (transition?.delay) {
      const id = setTimeout(() => {
        onTransition(transition.to);
      }, transition.delay);
      setTimeoutId(id);
    }
  }, [currentState, config.transitions, onTransition]);

  const handleTransition = (nextState: string) => {
    const transition = config.transitions.find(t => t.from === currentState && t.to === nextState);
    if (transition?.delay) {
      setTimeout(() => {
        onTransition(nextState);
      }, transition.delay);
    } else {
      onTransition(nextState);
    }
  };

  const isTransitionValid = (from: string, to: string): boolean => {
    return config.transitions.some((t) => t.from === from && t.to === to);
  };

  return (
    <div className="container">
      <h3 className="my-3">Current State: <span className="badge bg-primary">{currentState}</span></h3>
      <div>
        <h4 className="my-3">All States:</h4>
        <div className="d-flex flex-row flex-wrap">
          {config.states.map((state) => (
            <div key={state.name} className="p-2 state-container">
              <button
                className={`btn btn-${isTransitionValid(currentState, state.name) ? 'success' : 'secondary'} me-2`}
                onClick={() => handleTransition(state.name)}
                disabled={!isTransitionValid(currentState, state.name)}
              >
                {state.name}
              </button>
              {currentState === state.name && (
                <span className="badge bg-primary current-badge">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {resetOptions.allowReset && (
        <button className="btn btn-danger mt-3" onClick={resetOptions.onReset}>Reset</button>
      )}
    </div>
  );
};

export default FSMComponent;
