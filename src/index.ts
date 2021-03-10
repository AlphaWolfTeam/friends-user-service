import Server from './server';
import * as config from './config';

const main = async () => {
  const server = new Server(config.server.port);

  await server.start();

  console.log(`Server is listening on port ${config.server.port}`);
};

main().catch(err => console.log(err));
