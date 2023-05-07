const { REGEX_UUID, getId, getBaseUrl } = require('../helpers');

module.exports = (req, res) => {
  const id = getId(req);

  if (req.url === '/api/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(req.users));
    res.end();
  } else if (!REGEX_UUID.test(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        title: 'Validation Failed',
        message: 'UUID is not valid',
      })
    );
  } else if (getBaseUrl(req) === '/api/users/' && REGEX_UUID.test(id)) {
    res.setHeader('Content-Type', 'application/json');
    const foundUser = req.users.find((user) => user.id === id);

    if (foundUser) {
      res.statusCode = 200;
      res.write(JSON.stringify(foundUser));
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: 'Not Found',
          message: 'User not found',
        })
      );
    }
    res.end();
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
