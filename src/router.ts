import { Router } from 'express';
import { InvalidArgument } from './utils/errors/client.error';
import UserController from './user/user.controller';
import { wrapAsync } from './utils/wrappers';

const appRouter = Router();

appRouter.get('/isAlive', (req, res) => {
  res.status(200).send('alive');
});

appRouter.get('/api/users/:id', wrapAsync(async (req, res) => {
  const user = await UserController.getByID(req.params.id);
  res.send(user);
}));

appRouter.get('/api/users', async (req, res) => {
  const partialName = req.query.partialName;
  if (!partialName) {
    throw new InvalidArgument("argument 'partialName' was not sent in the query params");
  }
  const users = await UserController.searchByName(partialName.toString());
  res.send(users);
});

export default appRouter;
