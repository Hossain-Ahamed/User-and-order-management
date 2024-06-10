import { CustomError } from '../../../middleware/middleware';
import { TUser } from './user.interface';
import { user } from './user.model';
const createUserInDB = async (userData: TUser) => {
  //   check if user exist
  if (await user.isUserExist(userData.userId)) {
    const error = new Error('User Already exists') as CustomError;
    error.statusCode = 409;
    throw error;
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

const getUserByUserIdFromDB = async (userId: string) => {
  if (!(await user.isUserExist(Number(userId)))) {
    const error = new Error(`No user found by ${userId}`) as CustomError;
    error.statusCode = 404;
    throw error;
  }

  const result = await user
    .findOne({ userId })
    .select(
      '-_id -__v -password -fullName._id -isActive  -address._id -orders',
    );
  return result;
};


const updateUserInfoIntoDB = async (userId: string, userData : TUser) => {
    if (!(await user.isUserExist(Number(userId)))) {
      const error = new Error(`No user found by ${userId}`) as CustomError;
      error.statusCode = 404;
      throw error;
    }
  
    const result = await user.findOneAndUpdate({ userId },userData,{
      new : true,
      runValidators: true,
    }).select(
      '-_id -__v -password -fullName._id -isActive  -address._id -orders',
    );
      
    return result;
  };


const deleteUserFromDB = async (userId: string) => {
    if (!(await user.isUserExist(Number(userId)))) {
      const error = new Error(`No user found by ${userId}`) as CustomError;
      error.statusCode = 404;
      throw error;
    }
  
    const result = await user.deleteOne({userId});
      
    return result;
  };
export const userServices = {
  createUserInDB,
  getAllUserFromDB,
  getUserByUserIdFromDB,
  updateUserInfoIntoDB,
  deleteUserFromDB
};
