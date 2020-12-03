import { ApplicationError } from  '../utils/errors/application.error';
import { UserNotFoundError } from '../utils/errors/client.error';
import { KartoffelError } from '../utils/errors/server.error';
import { kartoffel } from '../config';
import axios, { AxiosResponse } from 'axios';
import { IUser } from './user.interface';

export default class UserController {

  static kartoffelProxyURL = `${kartoffel.url}/api/persons`;

  /**
 * Gets a user by its ID from the provider
 * @param id - the user ID
 */
  static async getByID(id: string): Promise<IUser> {
    let res: AxiosResponse;
    try {
      res = await axios.get(`${this.kartoffelProxyURL}/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status) {
        const statusCode: number = err.response.status;
        if (statusCode === 404) {
          throw new UserNotFoundError(`The user with id ${id} is not found`);
        }
        // Unauthorized
        if (statusCode === 401) {
          throw new ApplicationError(`Request to Kartoffel wasn't authorized: ${JSON.stringify(err)} `);
        }
        throw new KartoffelError(`Error in contacting the user service : ${JSON.stringify(err)}`);
      } else {
        throw new ApplicationError(`Unknown Error while contacting the user service : ${JSON.stringify(err)}`);
      }
    }
    // Status Code = 2XX / 3XX
    const user: IUser = res.data;
    return user;
  }

  /**
   * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
   * @param partialName - the partial name to search by.
   */
  static async searchByName(partialName: string): Promise<IUser[]> {
    let res: AxiosResponse;
    try {
      res = await axios.get(`${this.kartoffelProxyURL}${kartoffel.searchQuery}`, { params: { fullname: partialName } });
    } catch (err) {
      throw new ApplicationError(`Unknown Error: ${err} `);
    }
    const users: IUser[] = res.data;
    return users;
  }
}
