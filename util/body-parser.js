module.exports = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = '';

      request.on('data', (chunk) => {
        body += chunk;
      });
      request.on('end', () => {
        const parsedBody = JSON.parse(body);

        if (parsedBody.username && parsedBody.age && parsedBody.hobbies) {
          resolve(parsedBody);
        } else {
          reject('Body does not contain required fields');
        }
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
