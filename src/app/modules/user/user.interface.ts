import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type THobbies = {
  [index: number]: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: THobbies;
  address: TAddress;
  orders?: {
    [index: number]: TOrders;
  };
};

// user exist ts validation
export interface TUserModel extends Model<TUser> {
  isUserExist(userId: number): Promise<TUser | null>;
}
