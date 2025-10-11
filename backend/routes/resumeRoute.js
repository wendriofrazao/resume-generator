import express from 'express';
import { checkAuth} from '../middlewares/authMiddleware.js'
import { createResume, saveExperienceWorkController, savePersonalDetails, saveEducationController,saveSkillController } from '../controllers/resumeController.js';

const resumeRouter = express.Router();

resumeRouter.post("/create-resume", checkAuth, createResume);
resumeRouter.post("/create-personalDaital", savePersonalDetails);
resumeRouter.post("/create-experianceWork", saveExperienceWorkController);
resumeRouter.post("/create-skills", saveSkillController);
resumeRouter.post("/create-education", saveEducationController);
resumeRouter.post("/create-projects", createResume);

export default resumeRouter;
