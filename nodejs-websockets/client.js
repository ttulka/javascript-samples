let WebSocket = require('ws');

let conn = new WebSocket("ws://localhost:8080", 'json');
conn.onopen = () => {
  conn.send('Hello from the client! ' + Math.floor(Math.random() * 10));
};
conn.onerror = (error) => {
  console.log('Error! ' + error);
};
conn.onclose = () => {
  console.log("Server has closed the connection!");
};
conn.onmessage = (msg) => {
  console.log('Received: ' + msg.data);
};