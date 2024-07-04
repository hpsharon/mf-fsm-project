import React from 'react';
import {State, FSMConfig} from "../Types/FSMTypes";

interface StateListProps {
  config: FSMConfig;
  currentState: string;
  timer: number | null;
  onTransition: (nextState: string) => void;
  isTransitionValid: (from: string, to: string) => boolean;
}

const StateList: React.FC<StateListProps> = ({
                                               config,
                                               currentState,
                                               timer,
                                               onTransition,
                                               isTransitionValid
                                             }:StateListProps) => {
  return (
    <div>
      <h4>All States:</h4>
      <ul className="states-list list-group list-group-flush">
        {config.states.map((state: State) => (
          <li key={state.name} className="list-group-item">
            <button
              onClick={() => onTransition(state.name)}
              disabled={timer !== null || !isTransitionValid(currentState, state.name)}
              className={`btn btn-block ${currentState === state.name ? 'btn-primary' : 'btn-secondary'}`}
            >
              {state.name} {currentState === state.name && '(Current)'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StateList;
