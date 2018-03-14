function main() {
const cycles = 1000000000;
let c
let start = Date.now();
for (let i = 0; i < cycles; i++) {
/* Empty loop */ c++
} let end =
Date.now();
let duration = (end - start) / 1000;
console.log("JavaScript looped %d times in %d seconds", cycles, duration);
}
main();