import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/', test);
router.put('/update/:userId', verifyToken, updateUser) // Put req to update user

export default router;