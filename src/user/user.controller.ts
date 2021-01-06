import { Request, Response } from 'express';
import { InvalidArgument } from '../utils/errors/client.error';
import KartoffelService from './kartoffel.service';

export const getByID = async (req: Request, res: Response) => {
  const user = await KartoffelService.getByID(req.params.id);
  res.send(user);
};

export const searchByName = async (req: Request, res: Response) => {
  const partialName = req.query.partialName;
  if (!partialName) {
    throw new InvalidArgument("argument 'partialName' was not sent in the query params");
  }
  const users = await KartoffelService.searchByName(partialName.toString());
  res.send(users);
};
