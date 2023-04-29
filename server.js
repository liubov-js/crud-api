const http = require('http');

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {});

server.listen(PORT, () => {
  console.log('Server started on PORT: ', PORT);
});
