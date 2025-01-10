/**
 * Teardown function
 * 
 * Copyright (c) 2025, Alex Grant <alex@localNerve.com> (https://www.localnerve.com)
 * Licensed under the MIT license.
 */

function globalTeardown () {
  return new Promise(resolve => {
    globalThis.testServerInstance.destroy(() => {
      setTimeout(resolve, 1000);
    });
  });  
}

module.exports = globalTeardown;