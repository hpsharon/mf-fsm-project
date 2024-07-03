import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;  // Use the port provided by Heroku or fallback to 4000

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
app.use(express.static(path.join(__dirname, '../../react-app/build')));

// API endpoints
app.get('/api/someendpoint', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
});


app.get('/machines', (req: Request, res: Response) => {
  res.json(machines);
});

app.post('/machines', (req: Request, res: Response) => {
  const { id, label, config } = req.body;
  const newMachine: Machine = { id, label, config, currentState: config.initialState };
  machines.push(newMachine);
  res.status(201).json(newMachine);
});

app.post('/machines/:id/transition', (req: Request, res: Response) => {
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

app.delete('/machines/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  machines = machines.filter(machine => machine.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../react-app/build', 'index.html'));
});