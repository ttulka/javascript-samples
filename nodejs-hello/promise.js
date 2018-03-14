var promise1 = new Promise(function(resolve, reject) {
  setTimeout(()=> { resolve(10) }, 100)
});             

setInterval(() => { console.log(promise1); }, 1000)
