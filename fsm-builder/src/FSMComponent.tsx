import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FSMComponent.css';

export interface State {
  name: string;
  metadata?: any;
}

export interface Transition {
  from: string;
  to: string;
  delay?: number; // Delay in milliseconds
}

export interface FSMConfig {
  initialState: string;
  states: State[];
  transitions: Transition[];
}

export interface FSMProps {
  config: FSMConfig;
  currentState: string;
  onTransition: (nextState: string) => void;
}

const FSMComponent: React.FC<FSMProps> = React.memo((props: FSMProps) => {
  const { config, currentState, onTransition } = props;
  const [timer, setTimer] = useState<number | null>(null);
  const [nextStateName, setNextStateName] = useState<string | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setTimer(null);
  }, []);

  const startTransitionTimer = useCallback((delay: number, nextState: string) => {
    setNextStateName(nextState);
    setTimer(delay / 1000);

    timeoutIdRef.current = window.setTimeout(() => {
      onTransition(nextState);
      clearTimers();
    }, delay);
  }, [onTransition, clearTimers]);

  useEffect(() => {
    const currentTransition = config.transitions.find(t => t.from === currentState && t.delay);
    if (currentTransition && currentTransition.delay) {
      startTransitionTimer(currentTransition.delay, currentTransition.to);
    } else {
      clearTimers();
    }

    return () => {
      clearTimers();
    };
  }, [currentState, config.transitions, startTransitionTimer, clearTimers]);

  useEffect(() => {
    if (timer !== null) {
      intervalIdRef.current = window.setInterval(() => {
        setTimer(prevTimer => (prevTimer && prevTimer > 0 ? prevTimer - 1 : null));
      }, 1000);

      return () => clearInterval(intervalIdRef.current as number);
    }
  }, [timer]);

  const isTransitionValid = (from: string, to: string): boolean => {
    return config.transitions.some(t => t.from === from && t.to === to);
  };

  return (
    <div className="fsm-container card p-3">
      <h3 className="current-state card-title">Current State: {currentState}</h3>
      {timer !== null && nextStateName !== null && (
        <div className="timer alert alert-info">
          Next transition to <strong>{nextStateName}</strong> in: {timer} seconds
        </div>
      )}
      <div>
        <h4>All States:</h4>
        <ul className="states-list list-group list-group-flush">
          {config.states.map(state => (
            <li key={state.name} className="list-group-item">
              <button
                onClick={() => onTransition(state.name)}
                disabled={!isTransitionValid(currentState, state.name)}
                className={`btn btn-block ${currentState === state.name ? 'btn-primary' : 'btn-secondary'}`}
              >
                {state.name} {currentState === state.name && '(Current)'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default FSMComponent;
