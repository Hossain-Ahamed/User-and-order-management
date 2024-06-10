import { Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  TUserModel,
} from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    maxlength: [30, 'Length limit exceeded'],
    trim: true,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    maxlength: [30, 'Length limit exceeded'],
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

const userSchema = new Schema<TUser, TUserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: FullNameSchema,
    required: [true, 'Full name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be a positive number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, 'Active status is required'],
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: [
    {
      type: orderSchema,
    },
  ],
});

//hash the password
userSchema.pre('save', async function (next) {
  const userInfo = this;
  userInfo.password = await bcrypt.hash(
    userInfo.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const userInfo = this.getUpdate() as TUser;
  console.log(1,userInfo.password)
  next();
});


// remove the password after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


// userSchema.post(/^find/,function(this : Query<TUser,Document>,next){
//   this.password = '';
//   next()
// })

//exist check function implementation
userSchema.statics.isUserExist = async function (userId: string) {
  const existingUserInfo = await user.findOne({ userId });
  return existingUserInfo;
};

export const user = model<TUser, TUserModel>('Users', userSchema);
