import { NextFunction, Request, Response } from 'express';
import UserValidationSchema from './user.zod.validation';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: userData } = req.body;

    const zodParsedValidatedData = UserValidationSchema.parse(userData);

    const result = await userServices.createUserInDB(zodParsedValidatedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId: result.userId,
        username: result.username,
        fullName: {
          firstName: result.fullName.firstName,
          lastName: result.fullName.lastName,
        },
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: {
          street: result.address.street,
          city: result.address.city,
          country: result.address.country,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve a list of all users

export const userControllers = {
  createUser,
  getAllUsers,
};
