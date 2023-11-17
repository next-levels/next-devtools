const {requireJSONFilesInDirectory} = require("./io.service");
const {storeService} = require("../services/store.service");
const {areInputNodesReady,logService} = require("../helpers/node.helper");
const NodeFactory = require("../nodes/node.factory");


async function executeFlow(flow, contextKey = 'main') {
  const nodes = flow.flowData.nodes;
  const edges = flow.flowData.edges;

  storeService.addData('nodes-'+contextKey, nodes);
  storeService.addData('edges-'+contextKey, edges);

  const startNode = nodes.find((node) => node.type === 'startNode');

  if (!startNode) {
    throw new Error('No start node found in the flow');
  }

  logService(startNode, 'info', 'Flow execution started');

  let inputNodes = nodes.filter((node) => node.type === 'inputNode');
  let currentNodes = [startNode,...inputNodes];
  let executedNodes = [];

  while (currentNodes.length > 0) {
    let nextNodes = [];

    const connectedNodesArray = await Promise.all(
      currentNodes
        .filter((node) => node && areInputNodesReady(node.id, edges, executedNodes))
        .map(async (node) => {
          console.log('Processing node:', node); // Added logging
          try {
            const connectedNodes = await processNode(node, contextKey);
             executedNodes.push(node.id);
             executedNodes = [...new Set(executedNodes)];

            storeService.addData('executedNodes-' + contextKey, executedNodes);
            return connectedNodes;
          } catch (error) {
            logService(node, 'error', `Node execution failed: ${error.message}`);
            console.error('Error occurred:', error); // Added logging
            return [];
          }
        })
    );


    // Flatten the connectedNodesArray
    for (const connectedNodes of connectedNodesArray) {
      nextNodes = nextNodes.concat(connectedNodes);
    }
    nextNodes = [...new Set(nextNodes)];

    console.log('nextNodes', nextNodes); // Added logging
    currentNodes = nextNodes;
  }
  const endNode = nodes.find((node) => node.type === 'endNode');
  logService(endNode, 'info', 'Flow execution completed');
}

async function processNode(node, contextKey) {
  const nodeInstance = NodeFactory.createNode(node.type, node, contextKey);
  const result = await nodeInstance.run();
  return result;
}

async function startFlow(args,contextKey ='main') {
  const setName = args.command;

  let data = args.data;
  if (data && data.length > 0) {
    data = data.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  }

  data = JSON.parse(JSON.stringify(data).replace(/{{(.*?)}}/g, (match, variable) => {
    return data[variable] || '';
  }));

  storeService.addData('setName', setName);
  storeService.addData('context-'+contextKey, data);


  const jsonFiles = requireJSONFilesInDirectory(setName);

  if (jsonFiles.length === 0) {
    console.error(`No JSON files found in directory with setName ${setName}`);
    process.exit(1);
  }
  let jsonFile = jsonFiles.pop();
  await executeFlow(jsonFile.jsonData,contextKey);

  try {
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = {
  executeFlow,
  processNode,
  startFlow
};
