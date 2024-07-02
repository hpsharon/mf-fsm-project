import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FSMComponent.css';

export interface State {
  name: string;
  metadata?: any;
}

export interface Transition {
  from: string;
  to: string;
  condition?: () => boolean;
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

  const isTransitionValid = (from: string, to: string): boolean => {
    return config.transitions.some(t => t.from === from && t.to === to);
  };

  return (
    <div className="fsm-container card p-3">
      <h3 className="current-state card-title">Current State: {currentState}</h3>
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
