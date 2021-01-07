import { IUser, IUserNormalized } from '../user/user.interface';

export const getNormalisedUser = (user: IUser): IUserNormalized => {
  const normalisedFeatures = {
    hierarchyFlat: `${ user.hierarchy.join('/') }/${ user.job }`,
  };
  return { ...user, ...normalisedFeatures };
};
