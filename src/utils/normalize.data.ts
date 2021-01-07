import { IUser, IUserNormalized } from '../user/user.interface';

//returns IUserNormalized instead of IUser. 
//IUser: requires only the necessery filds in Kartoffel-user. 
//IUserNormalized: requires the Kartoffel-user fields and also the nessecery fields for the friend app. 
const getNormalizedUser = (user: IUser): IUserNormalized => {
  const normalizedFeatures = {
    hierarchyFlat: `${ user.hierarchy.join('/') }/${ user.job }`,
  };
  return { ...user, ...normalizedFeatures };
};

export default getNormalizedUser;
