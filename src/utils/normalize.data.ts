import { IUser, IUserNormalized } from '../user/user.interface';

/**
 * returns IUserNormalized instead of IUser. The IUser is the interface as it comes from kartoffel.
 * The IUserNormalized is the interface as it is reqired in the friends app.
 * @param user user from kartoffel
 */
const getNormalizedUser = (user: IUser): IUserNormalized => {
  const normalizedFeatures = {
    hierarchyFlat: `${ user.hierarchy.join('/') }/${ user.job }`,
  };
  return { ...user, ...normalizedFeatures };
};

export default getNormalizedUser;
