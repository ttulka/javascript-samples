function* dummyGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
var gen = dummyGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // undefined