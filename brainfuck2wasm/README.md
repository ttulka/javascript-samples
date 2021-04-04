# Brainfuck to WebAssembly Compiler

Binaryen based compiler from brainfuck to WebAssembly (Wasm).

Demo project.

## Usage

```sh
$ npm install
$ npm link

$ echo ">,[>,]<[.<]" > reverse.b

$ brainfuck2wasm reverse.b

$ node index.js reverse.wasm abcd
dcba
```