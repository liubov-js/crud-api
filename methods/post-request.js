const crypto = require('crypto');
const requestBodyParser = require('../util/body-parser');
const writeToFile = require('../util/write-to-file');

module.exports = async (req, res) => {
  if (req.url === '/api/users') {
    try {
      const body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.users.push(body);
      writeToFile(req.users);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          title: 'Validation Failed',
          message: 'Request body is not valid',
        })
      );
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        title: 'Not Found',
        message: 'Route not found',
      })
    );
  }
};