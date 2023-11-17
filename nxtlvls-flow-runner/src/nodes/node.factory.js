const { PromptProcessNode } = require('./types/promptProcessNode');
const { ProcessNode } = require('./types/processNode');
const {StartNode} = require("./types/start-node");
const {EndNode} = require("./types/end-node");
const {ExecFlowNode} = require("./types/exec-flow-node");
const {InputNode} = require("./types/input-node");

class NodeFactory {
  static createNode(nodeType, node, data) {
    switch (nodeType) {
      case 'promptProcessNode':
        return new PromptProcessNode(node, data);
      case 'processNode':
        return new ProcessNode(node, data);
      case 'startNode':
        return new StartNode(node, data);
      case 'endNode':
        return new EndNode(node, data);
      case 'execFlowNode':
        return new ExecFlowNode(node, data);
        case 'inputNode':
        return new InputNode(node, data);
      default:
        throw new Error(`Invalid node type: ${nodeType}`);
    }
  }
}

module.exports = NodeFactory;
