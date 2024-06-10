import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:userId', userControllers.getUserbyUserId);
router.put('/:userId', userControllers.updateUserbyUserId);
router.delete('/:userId', userControllers.deleteUserbyUserId);


export const UserRoutes = router;
