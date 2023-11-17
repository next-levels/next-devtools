const { executeCommands } = require('../../commands');
const {BaseNode} = require("../base-node");
const {logService} = require("../../helpers/node.helper");


class ProcessNode extends BaseNode {
  constructor(node, data) {
    super(node, data);
  }

  async execute() {
    const { node, data } = this;
    console.log(node);
    console.log(!node.data.setSelectedTask);

    if (!node.data.setSelectedTask) {
       logService(node, 'error', `No task selected for node`);
    let command = node.data.setSelectedTask.replace('.js', '');
    try {
      console.log('ProcessNode', command, this.inputs)
      return await executeCommands(command, this.inputs,node);
    } catch (error) {
      logService(node, 'error', `${error.message}`);
    }
    }
  }
}

module.exports = {
  ProcessNode,
};

