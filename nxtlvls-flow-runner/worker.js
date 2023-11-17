const fs = require('fs');
const {startFlow} = require("./src/services/node.service");


(async function main() {

  await startFlow({
    command: 'submodule',
    data: [
      {
        key: 'parentmodule',
        value: 'insurers'
      },
      {
        key: 'modulename',
        value: 'employees'
      },
      {
        key: 'directory',
        value: './apps/vosdellen/src/app/modules/admin/{{parentmodule}}/modules/{{modulename}}/'
      },
    ],
  });


  try {
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();


/*
 await startFlow({
  command: 'createmodule',
  data: [
    {
      key: 'modulename',
      value: 'guarantee'
    },
    {
      key: 'directory',
      value: 'apps/kumho/src/app/modules/admin/{{modulename}}/+state/'
    },
  ],
});
*/
