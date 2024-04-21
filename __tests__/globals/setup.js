const enableDestroy = require('server-destroy');
const testServer = require('./server');

function globalSetup () {
  const { fixtureRoot, port } = testServer.config;
  return new Promise((resolve, reject) => {
    testServer.start(fixtureRoot, port, (err, server) => {
      if (err) {
        return reject(err)
      }
      globalThis.testServerInstance = server;
      enableDestroy(globalThis.testServerInstance);
      resolve();
    });
  });
}

module.exports = globalSetup;