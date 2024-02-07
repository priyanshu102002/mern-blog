import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/', test);
router.put('/update/:userId', verifyToken, updateUser) // Put req to update user
router.delete('/delete/:userId', verifyToken, deleteUser) // Delete req to delete user

export default router;