
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