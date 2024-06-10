"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const FullNameSchema = new mongoose_1.Schema({
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
const addressSchema = new mongoose_1.Schema({
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
const orderSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = this;
        userInfo.password = yield bcrypt_1.default.hash(userInfo.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
userSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = this.getUpdate();
        console.log(1, userInfo.password);
        next();
    });
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
userSchema.statics.isUserExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUserInfo = yield exports.user.findOne({ userId });
        return existingUserInfo;
    });
};
exports.user = (0, mongoose_1.model)('Users', userSchema);
