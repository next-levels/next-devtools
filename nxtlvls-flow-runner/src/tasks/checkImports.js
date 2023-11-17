const { exec } = require('child_process');

async function checkImports(inputs) {

  if ('path' in inputObj) {
    const eslintCommand = `./node_modules/.bin/eslint ${inputObj.path}`;
    exec(eslintCommand, (error, stdout, stderr) => {
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
  checkImports,
};
