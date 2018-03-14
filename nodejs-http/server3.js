var http = require('http');
var url = require('url');
var httpsniffer = require('./httpsniffer');

var server = http.createServer();
server.on('request', (req, res) => {
  var requrl = url.parse(req.url, true);
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Hello, ${requrl.pathname}!\n`);
});

httpsniffer.sniffOn(server);

server.listen(8124, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8124');