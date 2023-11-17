const fs = require('fs');
const path = require('path');
const { fileStore } = require('../services/file.store');
const {logService} = require("../helpers/node.helper");

function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function createFile(inputObj,node) {
  console.log('Inputs:', JSON.stringify(inputObj));

  if ('path' in inputObj && 'content' in inputObj) {
    const dirPath = path.dirname(inputObj.path);
    createDirectoryIfNotExists(dirPath);

    fs.writeFileSync(inputObj.path, inputObj.content);
    fileStore.addData(getClassName(inputObj.path), inputObj.path);
     logService(node, 'info', `File created: ${inputObj.path}`);

  } else {
    console.error('Required keys "path" and "content" not found in inputs');
  }
}

function getClassName(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
}

module.exports = {
  createFile,
};
