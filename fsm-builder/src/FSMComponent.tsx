import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import './FSMComponent.css';  // Import custom CSS for positioning

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
}

const FSMComponent: React.FC<FSMProps> = (props: FSMProps) => {
  const { config, currentState, onTransition, onCreateSuccess, resetOptions } = props;

  useEffect(() => {
    if (onCreateSuccess) {
      onCreateSuccess();
    }
    // Empty dependency array to ensure this runs only once
  }, [onCreateSuccess]);

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
                onClick={() => onTransition(state.name)}
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
