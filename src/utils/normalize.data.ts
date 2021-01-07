import { IUser, IUserNormalized } from '../user/user.interface';

<<<<<<< HEAD
//returns IUserNormalized instead of IUser. 
//IUser: requires only the necessery filds in Kartoffel-user. 
//IUserNormalized: requires the Kartoffel-user fields and also the nessecery fields for the friend app. 
const getNormalizedUser = (user: IUser): IUserNormalized => {
  const normalizedFeatures = {
=======
export const getNormalisedUser = (user: IUser): IUserNormalized => {
  const normalisedFeatures = {
>>>>>>> dbf6356e0d2528fae68c8666995ae118fa3e78bf
    hierarchyFlat: `${ user.hierarchy.join('/') }/${ user.job }`,
  };
  return { ...user, ...normalizedFeatures };
};

export default getNormalizedUser;
