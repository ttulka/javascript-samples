import fs from 'fs';

const args = process.argv.slice(2);
const wasm = args[0];
const input = args[1];
const inputGen = readChar(input);

function* readChar(str = '') {    
  for (let s of str.split('')) yield s.charCodeAt();
}

WebAssembly
  .instantiate(fs.readFileSync(wasm), {
    hello: {
      input: () => inputGen.next().value,
      output: c => console.log('OUT', String.fromCharCode(c)), //process.stdout.write(String.fromCharCode(c));
      debug: (p, v) => console.log('DEBUG', p, v)  
    }
  })
  .then(({ instance }) => {
      console.log('EXPORTS', instance.exports);

      console.log(instance.exports.main());
      console.log('MEMORY', instance.exports.memory.buffer);
  })
  .catch(ex => console.error('Error while loading Wasm file:', ex));
