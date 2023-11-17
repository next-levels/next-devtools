const {checkSyntax} = require("./tasks/checkSyntax");
const {createFile} = require("./tasks/createFile");
const {checkImports} = require("./tasks/checkImports");
const {executeBash} = require("./tasks/executeBash");
const {logService} = require("./helpers/node.helper");

const commandsMap = {
  createFile,
  checkSyntax,
  checkImports,
  executeBash
};
async function executeCommands(commandName, params,node) {
  const command = commandsMap[commandName];

  if (!command) {
    logService(node, 'error', `Command not found: ${commandName}`);
  }

  return await command(params,node);
}


module.exports = {
  executeCommands,
};
