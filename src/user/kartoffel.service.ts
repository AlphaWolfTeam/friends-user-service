import { ApplicationError } from  '../utils/errors/application.error';
import { UserNotFoundError, InvalidArgument } from '../utils/errors/client.error';
import { KartoffelError } from '../utils/errors/server.error';
import { kartoffel } from '../config';
import axios, { AxiosResponse } from 'axios';
import { IUser, IUserNormalized } from './user.interface';
import  getNormalizedUser from '../utils/normalize.data';

/**
 * KartoffelService is an abstract class that includes static functions for communication with Kartoffel.
 */
export default abstract class KartoffelService {

  private static kartoffelProxyURL = `${kartoffel.url}/api/persons`;

  /**
   * Gets a user by its ID from the provider
   * @param id - the user ID
   */
  static getByID = async (id: string): Promise<IUser> => {
    let res: AxiosResponse;
    try {
      res = await axios.get(`${KartoffelService.kartoffelProxyURL}/${id}`);
    } catch (err) {
      if (err.response && err.response.status) {
        const statusCode: number = err.response.status;
        if (statusCode === 404) {
          throw new UserNotFoundError(`The user with id ${id} is not found`);
        }
        // Unauthorized
        if (statusCode === 401) {
          throw new ApplicationError(`Request to Kartoffel wasn't authorized: ${JSON.stringify(err)} `);
        }
        // Invalid argument error
        if (statusCode === 400) {
          throw new InvalidArgument(err.response.data.message);
        }
        throw new KartoffelError(`Error in contacting the user service : ${JSON.stringify(err)}`);
      } else {
        throw new ApplicationError(`Unknown Error while contacting the user service : ${JSON.stringify(err)}`);
      }
    }
    // Status Code = 2XX / 3XX
    const user: IUserNormalized = getNormalizedUser(res.data);
    return user;
  }

  /**
   * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
   * @param partialName - the partial name to search by.
   */
  static searchByName = async (partialName: string): Promise<IUser[]> => {
    let res: AxiosResponse;
    try {
      res = await axios.get(`${KartoffelService.kartoffelProxyURL}${kartoffel.searchQuery}`, { params: { fullname: partialName } });
    } catch (err) {
      throw new ApplicationError(`Unknown Error: ${err} `);
    }
<<<<<<< HEAD
    const users: IUserNormalized[] = res.data.map((user: IUser) => getNormalizedUser(user));
=======
    const users: IUserNormalized[] = res.data.map((user: IUser) => getNormalisedUser(user));
>>>>>>> dbf6356e0d2528fae68c8666995ae118fa3e78bf
    return users;
  }
}
