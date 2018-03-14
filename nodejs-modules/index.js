var module1 = require('./module1');

console.log(module1.next());
console.log(module1.next());
console.log(module1.next());

console.log(module1.next2());
console.log(module1.next2());
console.log(module1.next2());

var module2 = require('./module2');

console.log(module2());
console.log(module2());
console.log(module2());

var module3 = require('./module3');

console.log(module3.next());
console.log(module3.next());
console.log(module3.next());