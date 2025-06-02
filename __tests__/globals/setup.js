/**
 * test setup
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
import enableDestroy from 'server-destroy';
import testServer from './server.js';

export default function globalSetup () {
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
