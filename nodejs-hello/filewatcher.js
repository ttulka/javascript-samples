const fs = require('fs');

setInterval(() => {}, 1e6);

let w = fs.watch(__filename, { persistent: false }, (event, filename) => {
  console.log(event);
  console.log(filename);
})
w.close()