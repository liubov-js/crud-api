import { createServer, IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;
const PORT = numCPUs + '000';

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Forking a new worker');
    cluster.fork();
  });
} else {
  createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(Number(PORT) + 1, () => {
    console.log('Load balancer started on PORT: ', PORT);
  });

  console.log(`Worker ${process.pid} started`);
  // console.log(`Worker ${cluster.worker.id} listening on port ${PORT + cluster.worker.id}`);
}
