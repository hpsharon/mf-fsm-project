import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 4000;

interface Transition {
  from: string;
  to: string;
  condition?: () => boolean;
}

interface FSMConfig {
  initialState: string;
  states: { name: string; metadata?: any }[];
  transitions: Transition[];
}

interface Machine {
  id: string;
  label: string;
  config: FSMConfig;
  currentState: string;
}

let machines: Machine[] = [];

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoints
app.get('/api/someendpoint', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/machines', (req, res) => {
  res.json(machines);
});

app.post('/machines', (req, res) => {
  const { id, label, config } = req.body;
  const newMachine: Machine = { id, label, config, currentState: config.initialState };
  machines.push(newMachine);
  res.status(201).json(newMachine);
});

app.post('/machines/:id/transition', (req, res) => {
  const { id } = req.params;
  const { nextState } = req.body;

  const machine = machines.find(m => m.id === id);
  if (machine) {
    machine.currentState = nextState;
    res.json(machine);
  } else {
    res.status(404).send('Machine not found');
  }
});

app.delete('/machines/:id', (req, res) => {
  const { id } = req.params;
  machines = machines.filter(machine => machine.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
