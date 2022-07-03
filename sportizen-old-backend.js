const app = require('./src/app');
const http = require('http');

const chatting = require('./src/sockets/chat');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});

chatting(server);
