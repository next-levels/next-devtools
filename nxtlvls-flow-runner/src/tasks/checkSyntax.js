const { exec } = require('child_process');

async function checkSyntax(inputs) {

  if ('path' in inputObj) {
    exec(`eslint ${inputObj.path}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`ESLint error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`ESLint stderr: ${stderr}`);
        return;
      }
      console.log(`ESLint results: ${stdout}`);
    });
  } else {
    console.error('Required key "path" not found in inputs');
  }
}

module.exports = {
  checkSyntax,
};
