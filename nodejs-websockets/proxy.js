let httpProxy = require('http-proxy');

let addresses = [
  { host: 'one.example.com', port: 80 },
  { host: 'two.example.com', port: 80 }
];

let proxy = httpProxy.createServer({
//  target: {
//    host: 'www.example.com',
//    port: 80
//  }
  router: {
    'www.mywebsite.com' : '127.0.0.1:8001',
    'www.myothersite.com' : '127.0.0.1:8002',
  }
}).listen(80);