import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import MachineCard from './MachineCard';
import { trafficLightConfig, vendingMachineConfig, jsPromiseConfig, elevatorConfig, orderProcessingConfig, bookingSystemConfig, authenticationConfig, atmTransactionConfig } from './configs/fsmConfig';
import { FSMStore } from './stores/fsmStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const machineOptions = [
  { label: 'Traffic Light', config: trafficLightConfig },
  { label: 'Vending Machine', config: vendingMachineConfig },
  { label: 'JavaScript Promise', config: jsPromiseConfig },
  { label: 'Elevator System', config: elevatorConfig },
  { label: 'Order Processing', config: orderProcessingConfig },
  { label: 'Booking System', config: bookingSystemConfig },
  { label: 'Authentication', config: authenticationConfig },
  { label: 'ATM Transaction', config: atmTransactionConfig }
];

interface Machine {
  id: string;
  label: string;
  store: FSMStore;
  currentState: string;
}

const MyComponent: React.FC = observer(() => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState(machineOptions[0]);

  const handleAddMachine = useCallback(() => {
    const id = Math.random().toString(36).substring(7);
    const store = new FSMStore(id, selectedMachine.config);
    const newMachine = { id, label: selectedMachine.label, store, currentState: selectedMachine.config.initialState };
    setMachines(prevMachines => [...prevMachines, newMachine]);
  }, [selectedMachine]);

  const handleTransition = useCallback((id: string, nextState: string) => {
    setMachines(prevMachines =>
      prevMachines.map(machine =>
        machine.id === id ? { ...machine, currentState: nextState } : machine
      )
    );
  }, []);

  const handleRemoveMachine = useCallback((id: string) => {
    setMachines(prevMachines => prevMachines.filter(machine => machine.id !== id));
  }, []);

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
          <MachineCard key={machine.id} machine={machine} onTransition={handleTransition} onRemove={handleRemoveMachine} />
        ))}
      </div>
    </div>
  );
});

export default MyComponent;
