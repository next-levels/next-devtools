const {BaseNode} = require("../base-node");

class ExecFlowNode extends BaseNode {

  constructor(node,data) {
    super(node, data);
  }

  async execute() {
    const { node, data} = this;



  }
}

module.exports = {
  ExecFlowNode,
};
