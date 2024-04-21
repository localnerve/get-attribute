
function globalTeardown () {
  return new Promise(resolve => {
    globalThis.testServerInstance.destroy(() => {
      setTimeout(resolve, 1000);
    });
  });  
}

module.exports = globalTeardown;