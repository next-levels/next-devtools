const { exec } = require('child_process');

async function executeBash(inputs) {
  console.log('executeBash', inputs)
  if ('command' in inputs) {
    return new Promise((resolve, reject) => {
      exec(inputs.command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`Command stderr: ${stderr}`);
          reject(new Error(stderr));
          return;
        }
        console.log(`Command stdout: ${stdout}`);
        resolve(stdout);
      });
    });
  }

}

module.exports = {
  executeBash,
};
