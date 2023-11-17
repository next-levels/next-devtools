const {BaseNode} = require("../base-node");

class StartNode extends BaseNode {

  constructor(node,data) {
    super(node, data);
  }

  async execute() {
    const { node, data} = this;


  }
}

module.exports = {
  StartNode,
};
