import binaryen from 'binaryen';

export default class Compiler {

  compile(ast, moduleName) {
    this.moduleName = moduleName;
    this.module = new binaryen.Module();

    this.initModule();
    this.compileAst(ast);
    this.addMainFunction();

    if (!this.module.validate()) throw new SyntaxError('Module invalid.');

    //module.optimize();
    console.log(this.module.emitText());

    return this.module.emitBinary();
  }

  initModule() {
    this.body = [];

    this.module.addFunctionImport('input', this.moduleName, 'input', binaryen.none, binaryen.i32);
    this.module.addFunctionImport('output', this.moduleName, 'output', binaryen.i32, binaryen.none);
    this.module.addFunctionImport('debug', this.moduleName, 'debug', binaryen.createType([binaryen.i32, binaryen.i32]), binaryen.none);
    
    this.module.addGlobal('p', binaryen.i32, true, this.module.i32.const(0));  // pointer  
    
    this.module.setMemory(1, 3, 'memory');  // TODO remove export name
  }

  addMainFunction() {
    const block = this.module.block('exec', this.body);
    this.module.addFunction('main', binaryen.none, binaryen.none, [], block);
    this.module.addFunctionExport('main', 'main');
  }

  compileAst(ast) {
    ast.children.forEach(cmd => {
        console.log('CMD', cmd);
        let c;
        switch (cmd.kind) {
          case '+':
            c = this.increment();
            this.body.push(c);
            break;
          case '-':
            c = this.decrement();
            this.body.push(c);
            break;
          case '>':
            c = this.moveRight();
            this.body.push(c);
            break;
          case '<':
            c = this.moveLeft();
            this.body.push(c);
            break;
          case '.':
            c = this.output();
            this.body.push(c);
            break;
          case ',':
            c = this.input();
            this.body.push(c);
            break;
          case '#':
            c = this.debug();
            this.body.push(c);
            break;
        }
    });
    //   if (cmd.kind === 'LoopBegin') {
    //     const loop = compileLoop();
    //     return this.module.loop(null, loop);
    //   }
  }

  increment() {
    const p = this.module.global.get('p', binaryen.i32);
    const cur = this.module.i32.load8_u(0, 1, p);
    const add = this.module.i32.add(cur, this.module.i32.const(1));
    const sto = this.module.i32.store8(0, 1, p, add);
    return sto;
  }

  decrement() {
    const p = this.module.global.get('p', binaryen.i32);
    const cur = this.module.i32.load8_u(0, 1, p);
    const sub = this.module.i32.sub(cur, this.module.i32.const(1));
    const sto = this.module.i32.store8(0, 1, p, sub);
    return sto;
  }

  moveRight() {
    const p = this.module.global.get('p', binaryen.i32);
    const add = this.module.i32.add(p, this.module.i32.const(1));
    const set = this.module.global.set('p', add);
    return set;
  }

  moveLeft() {
    const p = this.module.global.get('p', binaryen.i32);
    const sub = this.module.i32.sub(p, this.module.i32.const(1));
    const set = this.module.global.set('p', sub);
    return set;
  }

  output() {
    const p = this.module.global.get('p', binaryen.i32);
    const cur = this.module.i32.load8_u(0, 1, p);
    const cal = this.module.call('output', [cur], binaryen.none);
    return cal;
  }

  input() {
    const p = this.module.global.get('p', binaryen.i32);
    const cal = this.module.call('input', [], binaryen.i32);
    const sto = this.module.i32.store8(0, null, p, cal);
    return sto;
  }

  debug() {
    const p = this.module.global.get('p', binaryen.i32);
    const cur = this.module.i32.load8_u(0, 1, p);
    const cal = this.module.call('debug', [p, cur], binaryen.none);
    return cal;
  }
}
