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
exports.userControllers = void 0;
const user_zod_validation_1 = __importDefault(require("./user.zod.validation"));
const user_service_1 = require("./user.service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const zodParsedValidatedData = user_zod_validation_1.default.parse(userData);
        const result = yield user_service_1.userServices.createUserInDB(zodParsedValidatedData);
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
    }
    catch (error) {
        next(error);
    }
});
// Retrieve a list of all users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Retrieve a specific user by ID
const getUserbyUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getUserByUserIdFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUserbyUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { user: userData } = req.body;
        const result = yield user_service_1.userServices.updateUserInfoIntoDB(userId, userData);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUserbyUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userControllers = {
    createUser,
    getAllUsers,
    getUserbyUserId,
    updateUserbyUserId,
    deleteUserbyUserId,
};
