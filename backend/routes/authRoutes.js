import express from 'express'
import { Register } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', Register);

export default router;