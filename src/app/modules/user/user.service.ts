import { TUser } from './user.interface';
import { user } from './user.model';
const createUserInDB = async (userData: TUser) => {
  //   check if user exist
  if (await user.isUserExist(userData.userId)) {
    throw new Error('User Already exists');
  }
  const result = await user.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await user
    .find({})
    .select(
      '-_id -__v -userId -password -fullName._id -isActive -hobbies -address._id -orders',
    );
  return result;
};

export const userServices = {
  createUserInDB,
  getAllUserFromDB,
};
