import { REGEX_UUID, getId, getBaseUrl } from '../helpers';
import { IncomingMessage, ServerResponse } from 'http';
import { writeToFile } from '../utils';
import { User } from '../interfaces';

export const deleteReq = (
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
      req.users.splice(index, 1);
      writeToFile(req.users);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(req.users));
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
