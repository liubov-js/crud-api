const requestBodyParser = require('../util/body-parser');
const writeToFile = require('../util/write-to-file');
const { REGEX_UUID, getId, getBaseUrl } = require('../helpers');

module.exports = async (req, res) => {
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
      const body = await requestBodyParser(req);
      const index = req.users.findIndex((user) => user.id === id);

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
