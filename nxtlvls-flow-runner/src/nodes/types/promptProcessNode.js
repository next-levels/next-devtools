const { executeCommands } = require('../../commands');
const fs = require('fs');
const { PromptBuilder } = require('../../prompt-builder');
const { sendDataToApi } = require('../../services/ai.service');
const { storeService } = require('../../services/store.service');
const promptTemplate = require('../../prompts/like-template');
const codeWriterMindset = require('../../prompts/mindsets/code-writer');
const {
  getRules,
  findFileAndReturnContent,
} = require('../../services/io.service');
const {
  getInputNodeResults,
  logService,
} = require('../../helpers/node.helper');
const { BaseNode } = require('../base-node');

class PromptProcessNode extends BaseNode {
  constructor(node, data) {
    super(node, data);
  }

  async execute() {
    const { node, data } = this;
    let flowContext = storeService.getDataForKey('context-' + this.contextKey);
    let moduleName = flowContext['submodule'];
    let directory = flowContext['project'];

    let file_name = directory + moduleName + '.' + node.data.context;

    console.log('file_name', file_name);
    let context = '';
    context += 'Model: ' + moduleName + '\n';
    context += 'Filename: ' + file_name + '\n';

    if (this.inputs !== null && this.inputs !== undefined) {
      context += JSON.stringify(this.inputs) + '\n';
    }

    try {
      let definitions_file_name = moduleName + '.csv';
      context +=
        'Definition: ' +
        findFileAndReturnContent('definitions', definitions_file_name) +
        '\n';
    } catch (error) {
      logService(node, 'error', `${error.message}`);
    }
    try {
      let template_file_name = 'model.' + node.data.context;
      context +=
        'Template: ' +
        findFileAndReturnContent('templates', template_file_name) +
        '\n';
    } catch (error) {
      logService(node, 'error', `${error.message}`);
    }
    let rules = '';
    try {
      rules =
        findFileAndReturnContent('coding-rules', node.data.context + '.txt') +
        '\n';
    } catch (error) {
      logService(node, 'error', `${error.message}`);
    }
    context += '\n';
    context += 'Code: \n';
    // let rules = getRules(file_name);

    let prompt = null;
    try {
      try {
        const promptBuilder = new PromptBuilder(
          context,
          codeWriterMindset(rules)
        );
        prompt = promptBuilder.build();
        logService(node, 'info', `${prompt}`);
      } catch (error) {
        logService(node, 'error', `${error.message}`);
      }

      const responseData = await sendDataToApi(prompt);
      if (responseData) {
        return { content: responseData, path: file_name };
      }
    } catch (error) {
      logService(node, 'error', `${error.message}`);
    }
  }
}

module.exports = {
  PromptProcessNode,
};
