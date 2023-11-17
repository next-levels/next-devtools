const {globalEvents} = require("./../globalEvents");
const {resultStore} = require("../stores/result.store");

function findNextNodes(currentNodeId, edges, nodes) {
  const nextNodeIds = edges
    .filter((edge) => edge.source === currentNodeId)
    .map((edge) => edge.target);

  return nodes.filter((node) => nextNodeIds.includes(node.id));
}

function logService(node, logType, message) {
  globalEvents.emit('globalEvent',`${node.id}:${logType}:${message}`);
  console.log(`[${logType}] Node: ${node.id}, Type: ${node.type}, Message: ${message}`);
}

function logServiceState(node, message) {
  globalEvents.emit('globalEvent',`${node.id}:state:${message}`);
  console.log(`${node.id}:${message}`);
}

function getNodesWithoutInput(nodes, edges) {
  return nodes.filter((node) => {
    // Check if there's no edge that has the current node as its target
    return !edges.some((edge) => edge.target === node.id);
  });
}
function areInputNodesReady(currentNodeId, edges, executedNodes) {
  const inputNodeIds = edges
    .filter((edge) => edge.target === currentNodeId)
    .map((edge) => edge.source);

  return inputNodeIds.every((inputNodeId) =>
    executedNodes.includes(inputNodeId)
  );
}

function getInputNodeResults(nodeId, edges, data) {
  const inputResults = [];
  const inputEdges = edges.filter((edge) => edge.target === nodeId);

  inputEdges.forEach((edge) => {
    const sourceId = edge.source;
    const result = resultStore.getDataForKey(sourceId);
    if (result) {
      inputResults.push(result);
    }
  });

  const keyValueArray = inputResults.reduce((accumulator, currentResult) => {
    Object.entries(currentResult).forEach(([key, value]) => {
      accumulator.push({ key: key, value: value });
    });
    return accumulator;
  }, []);

  const inputObj = keyValueArray.reduce((accumulator, currentPair) => {
    accumulator[currentPair.key] = currentPair.value;
    return accumulator;
  }, {});


  console.log('keyValueArray' + JSON.stringify(inputObj));
  return inputObj;
}

module.exports = {
  findNextNodes,
  areInputNodesReady,
  logService,
  getInputNodeResults,
  getNodesWithoutInput,
  logServiceState
};
