const API_URL = 'http://localhost:4000';

export const fetchMachines = async () => {
  const response = await fetch(`${API_URL}/machines`);
  if (!response.ok) {
    throw new Error('Failed to fetch machines');
  }
  return response.json();
};

export const addMachine = async (id: string, label: string, config: any, initialState: string) => {
  const response = await fetch(`${API_URL}/machines`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, label, config, currentState: initialState })
  });
  if (!response.ok) {
    throw new Error('Failed to add machine');
  }
  return response.json();
};

export const transitionMachine = async (id: string, nextState: string) => {
  const response = await fetch(`${API_URL}/machines/${id}/transition`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nextState })
  });
  if (!response.ok) {
    throw new Error('Failed to transition machine');
  }
  return response.json();
};

export const removeMachine = async (id: string) => {
  const response = await fetch(`${API_URL}/machines/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to remove machine');
  }
  return response.ok;
};
