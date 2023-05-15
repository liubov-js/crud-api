import { REGEX_UUID, getId, getBaseUrl } from '../helpers';
import { IncomingMessage, ServerResponse } from 'http';
import { bodyParser, writeToFile } from '../utils';
import { User } from '../interfaces';

export const putReq = async (
  req: IncomingMessage & { users: User[] },
  res: ServerResponse
) => {
  const id = getId(req);

  if (!REGEX_UUID.test(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        title: 'Validation Failed',
        message: 'UUID is not valid',
      })
    );
  } else if (getBaseUrl(req) === '/api/users/' && REGEX_UUID.test(id)) {
    try {
      const body: User = await bodyParser(req);
      const index = req.users.findIndex((user: User) => user.id === id);

      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({
            title: 'Not Found',
            message: 'User not found',
          })
        );
      } else {
        req.users[index] = { id, ...body };
        writeToFile(req.users);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(req.users[index]));
      }
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
