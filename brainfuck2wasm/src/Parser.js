export default class Parser {

  constructor() {
    this.cmdMap = new Map();
    this.cmdMap.set(43, '+');
    this.cmdMap.set(45, '-');
    this.cmdMap.set(62, '>');
    this.cmdMap.set(60, '<');
    this.cmdMap.set(46, '.');
    this.cmdMap.set(44, ',');
    this.cmdMap.set(91, '[');
    this.cmdMap.set(93, ']');
    this.cmdMap.set(35, '#');
  }

  parse(input) {
    this.input = input;
    this.index = 0;
    this.ast = [{ kind: 'root', commands: [] }];

    while (!this.eof()) {
      this.parseCommand();
    }

    const root = this.ast.pop();
    if (root.kind !== 'root') throw new SyntaxError('unmatched [');

    return root;
  }

  parseCommand() {
    let code;
    if (!this.isWhitespace(code = this.input[this.index++].charCodeAt())) {
      const cmd = this.commandFor(code);
      const branch = { kind: cmd };

      this.ast[this.ast.length - 1].commands.push(branch);

      if (cmd === '[') {
        branch.commands = [];
        this.ast.push(branch);
      
      } else if (cmd === ']') {
        if (this.ast.pop().kind !== '[') throw new SyntaxError('unmatched ]');
      }
    }
  }

  commandFor(code) {
    return this.cmdMap.get(code);
  }

  isWhitespace(code) {
    return !this.cmdMap.has(code);
  }

  eof() {
    return this.index >= this.input.length;
  }
}
