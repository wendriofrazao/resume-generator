import express from 'express';
import { checkAuth} from '../middlewares/authMiddleware.js'
import { createResume } from '../controllers/resumeController.js';

const resumeRouter = express.Router();

resumeRouter.post("/create-resume", checkAuth, createResume)

export default resumeRouter;
