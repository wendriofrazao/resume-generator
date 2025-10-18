import express from 'express'
import { Register } from '../controllers/authController.js'
import { Login } from '../controllers/authController.js'
import { Logout } from '../controllers/authController.js'
import { validate } from '../middlewares/authValidateMiddleware.js';
import { registerValidator } from '../validators/authValidator.js';
import { loginValidator } from '../validators/authValidator.js';
import { Me } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', validate(registerValidator), Register);
router.post('/login', validate(loginValidator), Login);
router.post('/logout', Logout);
router.get('/me', Me)

export default router;