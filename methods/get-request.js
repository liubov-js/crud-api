module.exports = (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
  const id = req.url.split('/')[3]; // TODO: 3
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );

  if (req.url === '/api/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(req.users));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        title: 'Validation Failed',
        message: 'UUID is not valid',
      })
    );
  } else if (baseUrl === '/api/users/' && regexV4.test(id)) {
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
