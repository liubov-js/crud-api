import * as fs from 'fs';
import * as path from 'path';
import { User } from './interfaces';
import { IncomingMessage } from 'http';

export const writeToFile = (data: User[]) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, '..', 'data.json'),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.log(err);
  }
};

export const bodyParser = (request: IncomingMessage): Promise<User> => {
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
