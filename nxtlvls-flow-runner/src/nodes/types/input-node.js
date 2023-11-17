const {BaseNode} = require("../base-node");

class InputNode extends BaseNode {

  constructor(node,data) {
    super(node, data);
  }

  async execute() {
    const { node, data} = this;

    console.log('InputNode', node.data.outputName, node.data.content)
    return {[node.data.outputName]: node.data.content}

  }
}

module.exports = {
  InputNode,
};
