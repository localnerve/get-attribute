/**
 * Create a local web server for tests.
 *
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */
import url from 'node:url';
import path from 'node:path';
import express from 'express';

const thisDirname = url.fileURLToPath(new URL('.', import.meta.url));
const port = 5343;

export const config = {
  origin: `http://localhost:${port}`,
  port,
  fixtureRoot: path.resolve(thisDirname, '..', 'fixtures')
};

export const start = (rootDir, port, cb) => {
  const server = express();
  server.use(express.static(rootDir));
  server.get('/longtime-6000', (req, res) => {
    setTimeout(() => {
      res.send('A slow response');
    }, 6000);
  });
  const httpServer = server.listen(parseInt(port, 10), (err) => {
    if (cb) {
      cb(err, httpServer);
    }
  });
};

export default {
  config,
  start
};
