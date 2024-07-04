import React from 'react';
import CurrentState from './CurrentState';
import Timer from './Timer';
import StateList from './StateList';
import { FSMConfig } from '../Types/FSMTypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../FSMComponent.css';

interface FSMContainerProps {
  config: FSMConfig;
  currentState: string;
  timer: number | null;
  nextStateName: string | null;
  onTransition: (nextState: string) => void;
  isTransitionValid: (from: string, to: string) => boolean;
}

const FSMContainer: React.FC<FSMContainerProps> = ({
                                                     config,
                                                     currentState,
                                                     timer,
                                                     nextStateName,
                                                     onTransition,
                                                     isTransitionValid
                                                   }: FSMContainerProps) => {
  return (
    <div className="fsm-container card p-3">
      <CurrentState currentState={currentState} />
      <Timer timer={timer} nextStateName={nextStateName} />
      <StateList
        config={config}
        currentState={currentState}
        timer={timer}
        onTransition={onTransition}
        isTransitionValid={isTransitionValid}
      />
    </div>
  );
};

export default FSMContainer;
