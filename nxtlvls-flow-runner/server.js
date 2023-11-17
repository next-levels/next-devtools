const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const { openAIRequest } = require('./src/services/ai.service');
const http = require('http');
const { startFlow } = require('./src/services/node.service');
const {globalEvents} = require('./src/globalEvents');
const {readAndProcessFiles} = require("./src/services/io.service");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3010;
const flowsDir = 'flows';
const tasksDir = 'src/tasks';
const promptsDir = 'src/prompts';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001', // Replace this with your client-side application URL
    methods: ['GET', 'POST'],
  },
});

async function generateCommand(text) {
  let commands = '';

  commands = await readAndProcessFiles();
  let prompt = `Given the text "${text}", suggest a suitable command and pick suitable paramter from the text from the following list:\n
  ${commands}
  Please provide the response formatted as a JSON object, with a 'command' field and a 'data' array containing the parameter(s) as key-value pairs.
 The JSON object should look like this:

{
"command": "<selected_command>",
"data": [
{
"key": "key1",
"value": "value1"
},
{
"key": "key2",
"value": "value2"
}
]
}"".\n`;


  const response = await openAIRequest(prompt);

  const regex = /{[\s\S]*}/;

  const match = response.trim().match(regex);

  if (match) {
    const jsonString = match[0];
     return JSON.parse(jsonString);
  } else {
    return "No JSON object found.";
  }

 }

function subscribeToGlobalEvents(socket) {
  const globalEventListener = async (cmd) => {
    console.log('Received global event', cmd);
    socket.emit('log', cmd);
  };
  globalEvents.on('globalEvent', globalEventListener);
  return globalEventListener;
}

function subscribeToContextEvents(socket) {
  const contextEventListener = async (cmd) => {
    console.log('Received context event', cmd);
    socket.emit('context', cmd);
  };
  globalEvents.on('emmitContext', contextEventListener);
  return contextEventListener;
}

function subscribeToFilesEvents(socket) {
  const filesEventListener = async (cmd) => {
    console.log('Received files event', cmd);
    socket.emit('files', cmd);
  };
  globalEvents.on('emmitFiles', filesEventListener);
  return filesEventListener;
}

function subscribeToResultsEvents(socket) {
  const resultsEventListener = async (cmd) => {
    console.log('Received results event', cmd);
    socket.emit('results', cmd);
  };
  globalEvents.on('emmitResults', resultsEventListener);
  return resultsEventListener;
}

io.on('connection', (socket) => {
  console.log('A user connected');
  let globalEventListener = subscribeToGlobalEvents(socket);
  let contextEventListener = subscribeToContextEvents(socket);
  let filesEventListener = subscribeToFilesEvents(socket);
  let resultsEventListener = subscribeToResultsEvents(socket);

  socket.on('command', async (cmd) => {
    const command = await generateCommand(cmd);
    console.log(command);
    const message = `Suggested command: ${command.command}`;
    socket.emit('message', message);
    await startFlow(command);
  });


  socket.on('debug_command', async (cmd) => {
    const command = JSON.parse(cmd);
    console.log(command);
    const message = `starting command: ${command.command}`;
    socket.emit('message', message);
    await startFlow(command);
  });



  socket.on('disconnect', () => {
    console.log('A user disconnected');
    globalEvents.removeListener('globalEvent', globalEventListener);
    globalEvents.removeListener('contextEvent', contextEventListener);
    globalEvents.removeListener('filesEvent', filesEventListener);
    globalEvents.removeListener('resultsEvent', resultsEventListener);
  });

  // Re-subscribe to globalEvents when the user reconnects
  socket.on('reconnect', () => {
    console.log('A user reconnected');
    globalEventListener = subscribeToGlobalEvents(socket);
    contextEventListener = subscribeToContextEvents(socket);
    filesEventListener = subscribeToFilesEvents(socket);
    resultsEventListener = subscribeToResultsEvents(socket);
  });
});


// List all flow JSON files in the "flows" directory
app.get('/flows', (req, res) => {
  fs.readdir(flowsDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading flows directory');
    } else {
      const jsonFiles = files.filter((file) => file.endsWith('.json'));
      res.status(200).json(jsonFiles);
    }
  });
});

app.get('/prompts', (req, res) => {
  fs.readdir(promptsDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading prompts directory');
    } else {
      const jsonFiles = files.filter((file) => file.endsWith('.js'));
      res.status(200).json(jsonFiles);
    }
  });
});

app.get('/tasks', (req, res) => {
  fs.readdir(tasksDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading tasks directory');
    } else {
      const jsonFiles = files.filter((file) => file.endsWith('.js'));
      res.status(200).json(jsonFiles);
    }
  });
});

// Retrieve a specific flow JSON
app.get('/flows/:flowName', (req, res) => {
  const flowName = req.params.flowName;
  const flowPath = path.join(flowsDir, flowName);

  fs.readFile(flowPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading flow JSON file');
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.post('/save-flow', (req, res) => {
  const { flowName, params,config, flowData } = req.body;
  const filePath = path.join(__dirname, 'flows', `${flowName}.json`);

  const flowJson = {
    name: flowName,
    params,
    config,
    flowData: JSON.parse(flowData),
  };

  fs.writeFile(filePath, JSON.stringify(flowJson, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving the flow');
    } else {
      res.status(200).send('Flow saved successfully');
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
