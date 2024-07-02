import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FSMComponent } from 'fsm-builder';
import { trafficLightConfig, vendingMachineConfig, jsPromiseConfig, retryMachineConfig } from './configs/fsmConfig';
import { RetryMachineStore, TrafficLightStore, VendingMachineStore, JavaScriptPromiseStore } from './stores/machineStores';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import {FSMStore} from "./stores/fsmStore";  // Import custom CSS for additional styling

const machineOptions = [
  { label: 'Traffic Light', config: trafficLightConfig, initialState: 'Red', StoreClass: TrafficLightStore },
  { label: 'Vending Machine', config: vendingMachineConfig, initialState: 'Idle', StoreClass: VendingMachineStore },
  { label: 'JavaScript Promise', config: jsPromiseConfig, initialState: 'Pending', StoreClass: JavaScriptPromiseStore },
  { label: 'Retry Machine', config: retryMachineConfig, initialState: 'Idle', StoreClass: RetryMachineStore }
];

interface Machine {
  id: string;
  label: string;
  store: FSMStore;
}

const MyComponent: React.FC = observer(() => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState(machineOptions[0]);

  const handleAddMachine = () => {
    const id = Math.random().toString(36).substring(7);
    const store = new selectedMachine.StoreClass(id, selectedMachine.initialState, selectedMachine.config);
    setMachines([...machines, { id, label: selectedMachine.label, store }]);
  };

  const handleReset = (id: string) => {
    const machine = machines.find(machine => machine.id === id);
    if (machine) {
      machine.store.reset();
    }
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex">
            <select className="form-select me-2" value={selectedMachine.label} onChange={(e) => setSelectedMachine(machineOptions.find(option => option.label === e.target.value)!)}>
              {machineOptions.map(option => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleAddMachine}>Add Machine</button>
          </div>
        </div>
      </div>
      <div className="row">
        {machines.map(machine => (
          <div key={machine.id} className="col-lg-4 col-md-6 mb-3">
            <div className="border p-3">
              <h2 className="my-3">{machine.label}</h2>
              <FSMComponent
                config={machine.store.config}
                currentState={machine.store.currentState}
                onTransition={(nextState: string) => machine.store.transitionTo(nextState)}
                onCreateSuccess={() => machine.store.handleAutomaticTransitions()}
                resetOptions={{ allowReset: true, onReset: () => handleReset(machine.id) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MyComponent;
