const compose = (...fns) => x => {
  console.log('initReducer:', x);
  return fns.reduceRight((y, f) => { 
    console.log('reducing...'); 
    console.log('previousReducer:', y); 
    console.log('currectTransducer:', f); 
    return f(y);
  }, x)
};
  
//const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x); 
//const compose = (...reducers) => initReducer => reducers.reduceRight((previousReducer, currectTransducer) => currectTransducer(previousReducer), initReducer)

const map = f => step => (a, c) => step(a, f(c));

const filter = predicate => step => (a, c) => predicate(c) ? step(a, c) : a;

const isEven = n => n % 2 === 0;
const double = n => n * 2;

const doubleEvens = compose(
  filter(isEven),
  map(double),
);

const arrayConcat = (a, c) => a.concat([c]);

const xform = doubleEvens(arrayConcat);

console.log('+++++++++++++');

console.log('xform:', xform);

console.log('------------');

const result = [1,2,3,4,5,6].reduce(xform, []); // [4, 8, 12]
console.log(result);
