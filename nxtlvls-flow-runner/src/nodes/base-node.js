const { Observable } = require('rxjs');
 const {storeService} = require("../services/store.service");
const {findNextNodes, logService, getInputNodeResults, logServiceState} = require("../helpers/node.helper");
const {resultStore} = require("../stores/result.store");

class BaseNode {
  node;
  contextKey;
  edges;
  nodes;
  inputs = {};
  constructor(node, contextKey) {
    this.node = node;
    this.contextKey = contextKey;
    this.edges = storeService.getDataForKey('edges-'+this.contextKey);
    this.nodes = storeService.getDataForKey('nodes-'+this.contextKey);
    let executedNodes = storeService.getDataForKey('executedNodes-'+this.contextKey);
    this.inputs = getInputNodeResults(node.id, this.edges, executedNodes) || {};

    node.data = JSON.parse(JSON.stringify(node.data).replace(/{{(.*?)}}/g, (match, variable) => {
      return storeService.getDataForKey('context-'+this.contextKey)[variable] || '';
    }));

    logServiceState(this.node, 'start');


    if (new.target === BaseNode) {
      throw new TypeError('Cannot construct Node instances directly');
    }
  }

  execute() {
    throw new Error('You have to implement the method execute!');
  }

  async run() {
    try {
      logService(this.node, 'info', 'Node processing started');

      const result = await this.execute();
      console.log('result', result);
      logServiceState(this.node, 'success');

      resultStore.addData(this.node.id, result);
      return findNextNodes(this.node.id, this.edges, this.nodes);

    } catch (error) {
      logService(this.node, 'error', `Node execution failed: ${error.message}`);
      logServiceState(this.node, 'error');
    }
  }
}

module.exports = {
  BaseNode,
};
