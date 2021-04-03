import fs from 'fs';

WebAssembly
  .instantiate(fs.readFileSync('hello.wasm'), {
    hello: {
      input: () => 0,
      output: x => console.log('OUT', x),
      debug: (p, v) => console.log('DEBUG', p, v)  
    }
  })
  .then(({ instance }) => {
      console.log('EXPORTS', instance.exports);
      console.log(instance.exports.main());
      console.log('MEMORY', instance.exports.memory.buffer);
  })
  .catch(ex => console.error('Error while loading Wasm file:', ex));