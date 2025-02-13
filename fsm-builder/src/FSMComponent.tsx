import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FSMProps } from "./Types/FSMTypes";
import './FSMComponent.css';
import FSMContainer from "./components/FSMContainer";


/**
 * FSMComponent - A React component to visualize and manage a finite state machine.
 *
 * @param {FSMProps} props - The properties for the component.
 * @param {FSMConfig} props.config - The configuration for the FSM.
 * @param {string} props.currentState - The current state of the FSM.
 * @param {function} props.onTransition - Function to handle state transitions.
 *
 * @returns {JSX.Element} The rendered FSMComponent.
 */
const FSMComponent: React.FC<FSMProps> = React.memo((props: FSMProps) => {
  const { config, currentState, onTransition } = props;
  const [timer, setTimer] = useState<number | null>(null);
  const [nextStateName, setNextStateName] = useState<string | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  /**
   * Clears all active timers.
   */
  const clearTimers = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  /**
   * Starts a timer for the next state transition.
   *
   * @param {number} delay - The delay in milliseconds before the transition.
   * @param {string} nextState - The next state to transition to.
   */
  const startTransitionTimer = useCallback((delay: number, nextState: string) => {
    setNextStateName(nextState);
    setTimer(delay / 1000);

    timeoutIdRef.current = window.setTimeout(() => {
      onTransition(nextState);
    }, delay);
  }, [onTransition]);

  /**
   * Effect hook to handle state transitions with delays.
   */
  useEffect(() => {
    const currentTransition = config.transitions.find(t => t.from === currentState && t.delay);
    if (currentTransition && currentTransition.delay) {
      startTransitionTimer(currentTransition.delay, currentTransition.to);
    } else {
      setNextStateName(null);
      setTimer(null);
    }

    return () => {
      clearTimers();
    };
  }, [currentState, config.transitions, startTransitionTimer, clearTimers]);

  /**
   * Effect hook to manage the countdown timer.
   */
  useEffect(() => {
    if (timer !== null) {
      intervalIdRef.current = window.setInterval(() => {
        setTimer((prevTimer:number|null) => {
          if (prevTimer && prevTimer > 1) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalIdRef.current as number);
            return null;
          }
        });
      }, 1000);

      return () => clearInterval(intervalIdRef.current as number);
    }
  }, [timer]);

  /**
   * Checks if a transition from one state to another is valid.
   *
   * @param {string} from - The current state.
   * @param {string} to - The next state.
   *
   * @returns {boolean} True if the transition is valid, false otherwise.
   */
  const isTransitionValid = (from: string, to: string): boolean => {
    return config.transitions.some(t => t.from === from && t.to === to);
  };

  return (
    <FSMContainer
      config={config}
      currentState={currentState}
      timer={timer}
      nextStateName={nextStateName}
      onTransition={onTransition}
      isTransitionValid={isTransitionValid}
    />
  );
});

export default FSMComponent;
