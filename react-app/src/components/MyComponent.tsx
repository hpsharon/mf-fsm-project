import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { produce } from 'immer';
import { FSMConfig } from 'fsm-builder';
import MachineCard from './MachineCard/MachineCard';
import MachineSelector from './MachineSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import { trafficLightConfig, vendingMachineConfig, jsPromiseConfig, elevatorConfig, orderProcessingConfig, bookingSystemConfig, authenticationConfig, atmTransactionConfig } from '../configs/fsmConfig';
import { FSMStore } from '../stores/fsmStore';
import { fetchMachines, addMachine, transitionMachine, removeMachine } from '../services/apiService';


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
    fetchMachines()
      .then((data: Machine[]) => {
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
      .catch((error:any) => {
        console.error('Error loading machines:', error);
      });
  }, []);

  const handleAddMachine = useCallback(() => {
    const id = Math.random().toString(36).substring(7);
    const store = new FSMStore(id, selectedMachine.config);
    const newMachine: Machine = { id, label: selectedMachine.label, config: selectedMachine.config, store, currentState: selectedMachine.config.initialState };

    addMachine(id, selectedMachine.label, selectedMachine.config, selectedMachine.config.initialState)
      .then(() => setMachines(prevMachines => [...prevMachines, newMachine]));
  }, [selectedMachine]);

  const handleTransition = useCallback((id: string, nextState: string) => {
    transitionMachine(id, nextState)
      .then(updatedMachine => {
        setMachines(produce(draft => {
          const machine = draft.find(m => m.id === id);
          if (machine) {
            machine.currentState = updatedMachine.currentState;
          }
        }));
      });
  }, []);

  const handleRemoveMachine = useCallback((id: string) => {
    removeMachine(id)
      .then(() => {
        setMachines(prevMachines => prevMachines.filter(machine => machine.id !== id));
      });
  }, []);

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <MachineSelector
            machineOptions={machineOptions}
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
            handleAddMachine={handleAddMachine}
          />
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
