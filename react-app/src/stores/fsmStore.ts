import { makeObservable, observable, action } from 'mobx';

export class FSMStore {
  id: string;
  currentState: string;
  initialState: string;
  config: any;

  constructor(id: string, config: any) {
    this.id = id;
    this.config = config;
    this.initialState = config.initialState;
    this.currentState = this.initialState;
    makeObservable(this, {
      currentState: observable,
      transitionTo: action
    });
  }

  transitionTo(nextState: string) {
    this.currentState = nextState;
  }
}
