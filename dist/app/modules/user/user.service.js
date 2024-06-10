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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserInDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    //   check if user exist
    if (yield user_model_1.user.isUserExist(userData.userId)) {
        const error = new Error('User Already exists');
        error.statusCode = 409;
        throw error;
    }
    const result = yield user_model_1.user.create(userData);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.user
        .find({})
        .select('-_id -__v -userId -password -fullName._id -isActive -hobbies -address._id -orders');
    return result;
});
const getUserByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.user.isUserExist(Number(userId)))) {
        const error = new Error(`No user found by ${userId}`);
        error.statusCode = 404;
        throw error;
    }
    const result = yield user_model_1.user
        .findOne({ userId })
        .select('-_id -__v -password -fullName._id -isActive  -address._id -orders');
    return result;
});
const updateUserInfoIntoDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.user.isUserExist(Number(userId)))) {
        const error = new Error(`No user found by ${userId}`);
        error.statusCode = 404;
        throw error;
    }
    const result = yield user_model_1.user.findOneAndUpdate({ userId }, userData, {
        new: true,
        runValidators: true,
    }).select('-_id -__v -password -fullName._id -isActive  -address._id -orders');
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.user.isUserExist(Number(userId)))) {
        const error = new Error(`No user found by ${userId}`);
        error.statusCode = 404;
        throw error;
    }
    const result = yield user_model_1.user.deleteOne({ userId });
    return result;
});
exports.userServices = {
    createUserInDB,
    getAllUserFromDB,
    getUserByUserIdFromDB,
    updateUserInfoIntoDB,
    deleteUserFromDB
};
