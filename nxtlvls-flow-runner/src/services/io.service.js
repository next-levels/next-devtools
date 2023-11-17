const fs = require('fs');
const fsa = require('fs').promises;
 const path = require('path');

const config = require('../../config.json');
function findProjectByCMS(cms) {
  const project = config.projects.find((project) => project.type === cms);

  if (!project) {
    console.error(`Project not found: ${cms}`);
    return null;
  }

  return project;
}

function createFilesFromResponse(data) {
  data.forEach((fileData) => {
    const project = config.projects.find(
      (project) => project.name === fileData.project
    );

    if (!project) {
      console.error(`Project not found: ${fileData.project}`);
      return;
    }

    const filePath = `${project.path}${fileData.path}`;

    fs.writeFileSync(filePath, fileData.content);
    console.log(`File created: ${filePath}`);
  });
}

function requireJSONFilesInDirectory(setName) {
  const jsonFiles = [];
  const directory = 'flows/';

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        scanDirectory(filePath);
      } else if (path.extname(file) === '.json') {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const jsonData = JSON.parse(fileContent);

          if (jsonData.name === setName) {
            jsonFiles.push({ filePath, jsonData });
          }
        } catch (error) {
          console.error(`Error requiring JSON file: ${error.message}`);
        }
      }
    }
  }

  scanDirectory(directory);
  return jsonFiles;
}

function getRules(filePath) {
  const project = findProjectByCMS(filePath);
  const filetype = filePath.split('.')[1];
  const projectFilename = filePath.split('.')[0];

  const rulesDir = 'rules';
  const fileTypeRulesDir = path.join(rulesDir, filetype);
  const projectFileRulesDir = path.join(rulesDir, projectFilename);

  const fileTypeRulesFiles = fs.readdirSync(fileTypeRulesDir);
  const projectFileRulesFiles = fs.readdirSync(projectFileRulesDir);

  const fileTypeRules = fileTypeRulesFiles.map((ruleFile) => {
    const ruleFilePath = path.join(fileTypeRulesDir, ruleFile);
    return fs.readFileSync(ruleFilePath, 'utf-8');
  });

  const projectFileRules = projectFileRulesFiles.map((ruleFile) => {
    const ruleFilePath = path.join(projectFileRulesDir, ruleFile);
    return fs.readFileSync(ruleFilePath, 'utf-8');
  });

  return new Set([...fileTypeRules, ...projectFileRules]);
}

function findFileAndReturnContent(localDirectory,searchedFileName) {
  const directory = 'context/'+localDirectory+'/';
  const files = fs.readdirSync(directory);

  for (const file of files) {
    if (file === searchedFileName) {
      const filePath = path.join(directory, file);
      return fs.readFileSync(filePath, 'utf-8');
    }
  }

  // If the file was not found, return an error message
  return `File "${searchedFileName}" not found in "${directory}"`;
}

async function readAndProcessFiles() {
  let commands = '';
  const flowsDir = 'flows';


  try {
    const files = await fsa.readdir(flowsDir);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    for (const file of jsonFiles) {
      try {
        const fileContent = await fsa.readFile(`${flowsDir}/${file}`, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        if (jsonData.name && jsonData.params) {
          commands += `${jsonData.name} - <${jsonData.params}>\n`;
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (err) {
    console.error(err);
  }

   return commands;
}

module.exports = {
  requireJSONFilesInDirectory,
  getRules,
  findFileAndReturnContent,
  readAndProcessFiles,
 };
