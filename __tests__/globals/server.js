/**
 * Create a local web server for tests.
 *
 * Copyright (c) 2024, Alex Grant, LocalNerve, contributors
 */
const path = require('node:path');
const express = require('express');

const port = 5343;

module.exports = {
  config: {
    origin: `http://localhost:${port}`,
    port,
    fixtureRoot: path.resolve(__dirname, '..', 'fixtures')
  },
  start: (rootDir, port, cb) => {
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
  }
};
