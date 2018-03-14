// export the module as a single encapsulated structure

var module3 = () => {
  var count = 0;
  const fce = () => count += 100;
  
  return {
    next: fce
  }
}

module.exports = module3();