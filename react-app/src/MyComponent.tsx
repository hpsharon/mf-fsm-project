import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import MachineCard from './MachineCard';
import { FSMConfig } from 'fsm-builder';
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
  config: FSMConfig;
  store: FSMStore;
  currentState: string;
}

const MyComponent: React.FC = observer(() => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState(machineOptions[0]);

  useEffect(() => {
    fetch('http://localhost:4000/machines')
      .then(res => res.json())
      .then(data => {
        const loadedMachines = data.map((machine: Machine) => {
          const store = new FSMStore(machine.id, machine.config);
          store.transitionTo(machine.currentState);
          return {
            ...machine,
            store
          };
        });
        setMachines(loadedMachines);
      })
      .catch(error => {
        console.error('Error loading machines:', error);
      });
  }, []);

  const handleAddMachine = useCallback(() => {
    const id = Math.random().toString(36).substring(7);
    const store = new FSMStore(id, selectedMachine.config);
    const newMachine: Machine = { id, label: selectedMachine.label, config: selectedMachine.config, store, currentState: selectedMachine.config.initialState };

    fetch('http://localhost:4000/machines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, label: selectedMachine.label, config: selectedMachine.config, currentState: selectedMachine.config.initialState })
    }).then(res => res.json())
      .then(() => setMachines(prevMachines => [...prevMachines, newMachine]));
  }, [selectedMachine]);

  const handleTransition = useCallback((id: string, nextState: string) => {
    const machine = machines.find(m => m.id === id);
    if (!machine) return;

    const transition = machine.store.config.transitions.find((t: any) => t.from === machine.currentState && t.to === nextState);

    if (transition) {
      fetch(`http://localhost:4000/machines/${id}/transition`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nextState })
      }).then(res => res.json())
        .then(updatedMachine => {
          setMachines(prevMachines =>
            prevMachines.map(machine =>
              machine.id === id ? { ...machine, currentState: updatedMachine.currentState } : machine
            )
          );
        });
    }
  }, [machines]);

  const handleRemoveMachine = useCallback((id: string) => {
    fetch(`http://localhost:4000/machines/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setMachines(prevMachines => prevMachines.filter(machine => machine.id !== id));
    });
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
