import express from 'express';
import { checkAuth} from '../middlewares/authMiddleware.js'

// create imports
import {
    createResume, 
    saveExperienceWorkController, 
    savePersonalDetails, 
    saveEducationController,
    saveSkillController
} from '../controllers/resumeController.js';

// updates imports
import {
    updatePersonalDetailsController,
    updateResumeController, 
    updateEducationController, 
    updateSkillController, 
    updateExperienceController, 
} from '../controllers/resumeController.js'

// controllers imports
import {
  deleteResumeController,
  deletePersonalDetailsController,
  deleteExperienceWorkController,
  deleteSkillsController,
  deleteEducationController,
//   deleteProjectsController
} from "../controllers/resumeController.js";


const resumeRouter = express.Router();

// create routes resumes
resumeRouter.post("/create-resume", checkAuth, createResume);
resumeRouter.post("/create-personalDetails/:resumeId", checkAuth, savePersonalDetails);
resumeRouter.post("/create-experienceWork/:resumeId", checkAuth, saveExperienceWorkController);
resumeRouter.post("/create-skills/:resumeId", checkAuth, saveSkillController);
resumeRouter.post("/create-education/:resumeId", checkAuth, saveEducationController);
// resumeRouter.post("/create-projects", createResume);

// updated routes resumes
resumeRouter.put("/updated-resume", updateResumeController);
resumeRouter.put("/updated-personalDetails/:resumeId/:personalDetailsId", updatePersonalDetailsController);
resumeRouter.put("/updated-experienceWork/:resumeId/:experienceId", updateExperienceController);
resumeRouter.put("/updated-skills/:resumeId/:educationId", updateSkillController);
resumeRouter.put("/updated-education/:resumeId/:skillId", updateEducationController);
// resumeRouter.put("/updated-projects", createResume);

// Delete routes resumes
resumeRouter.delete("/resume/:id", deleteResumeController);
resumeRouter.delete("/personalDetails/:resumeId/:personalDetailsId", deletePersonalDetailsController);
resumeRouter.delete("/experienceWork/:resumeId/:experienceId", deleteExperienceWorkController);
resumeRouter.delete("/education/:resumeId/:educationId", deleteEducationController);
resumeRouter.delete("/skills/:resumeId/:skillId", deleteSkillsController);
// resumeRouter.delete("/projects/:id", deleteProjectsController);

export default resumeRouter;
