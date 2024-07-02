import { makeObservable, observable, action } from 'mobx';
import {isNumber} from "node:util";

export class FSMStore {
  id: string;
  currentState: string;
  initialState: string;
  config: any;

  constructor(id: string, initialState: string, config: any) {
    this.id = id;
    this.currentState = initialState;
    this.initialState = initialState;
    this.config = config;
    makeObservable(this, {
      currentState: observable,
      transitionTo: action,
      handleAutomaticTransitions: action,
      reset: action
    });
  }

  transitionTo(nextState: string) {
    this.currentState = nextState;
    this.handleAutomaticTransitions();
  }

  handleAutomaticTransitions() {
    const transition = this.config.transitions.find((t: any) => t.from === this.currentState && !isNaN(t.delay));
    if (transition) {
      setTimeout(() => {
        this.transitionTo(transition.to);
      }, transition.delay || 0);
    }
  }

  reset() {
    this.transitionTo(this.initialState);
  }
}
