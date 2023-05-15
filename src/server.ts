import { createServer, ServerResponse } from 'http';
import { getReq } from './methods/get-request';
import { deleteReq } from './methods/delete-request';
import { postReq } from './methods/post-request';
import { putReq } from './methods/put-request';
const users = require('../data.json');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const server = createServer((req: any, res: ServerResponse) => {
  req.users = users;

  switch (req.method) {
    case 'GET':
      getReq(req, res);
      break;
    case 'POST':
      postReq(req, res);
      break;
    case 'PUT':
      putReq(req, res);
      break;
    case 'DELETE':
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(
        JSON.stringify({
          title: 'Not Found',
          message: 'Route not found',
        })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log('Server started on PORT: ', PORT);
});
