import express from 'express';
import { checkAuth} from '../middlewares/authMiddleware.js'

import {getResumesByUser, updateResumeTemplateController} from '../controllers/resumeController.js'
// create imports
import {
    createResume, 
    generateResumePDF,
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
import { getResumeCompleteController } from "../controllers/resumeController.js";

const resumeRouter = express.Router();

resumeRouter.get("/get-all-resumes", checkAuth, getResumesByUser)

resumeRouter.get("/get-resume-complete/:resumeId", checkAuth, getResumeCompleteController);
resumeRouter.get("/download-pdf/:resumeId", checkAuth, generateResumePDF);

resumeRouter.get("/get-personal", checkAuth, getResumesByUser)
resumeRouter.get("/get-experience", checkAuth, getResumesByUser)
resumeRouter.get("/get-education", checkAuth, getResumesByUser)
resumeRouter.get("/get-skill", checkAuth, getResumesByUser)

// create routes resumes
resumeRouter.post("/create-resume", checkAuth, createResume);
resumeRouter.post("/create-personalDetails/:resumeId", checkAuth, savePersonalDetails);
resumeRouter.post("/create-experienceWork/:resumeId", checkAuth, saveExperienceWorkController);
resumeRouter.post("/create-skills/:resumeId", checkAuth, saveSkillController);
resumeRouter.post("/create-education/:resumeId", checkAuth, saveEducationController);
// resumeRouter.post("/create-projects", createResume);

// updated routes resumes
resumeRouter.put("/updated-resume/:resumeId", checkAuth, updateResumeController);
resumeRouter.put('/update-resume-template/:resumeId', checkAuth, updateResumeTemplateController);
resumeRouter.put("/updated-personalDetails/:resumeId/:personalDetailsId", checkAuth, updatePersonalDetailsController);
resumeRouter.put("/updated-experienceWork/:resumeId/:experienceId", checkAuth, updateExperienceController);
resumeRouter.put("/updated-skills/:resumeId/:skillId", checkAuth, updateSkillController);
resumeRouter.put("/updated-education/:resumeId/:educationId", checkAuth, updateEducationController);
// resumeRouter.put("/updated-projects", createResume);

// Delete routes resumes
resumeRouter.delete("/resume/:id", deleteResumeController);
resumeRouter.delete("/personalDetails/:resumeId/:personalDetailsId", deletePersonalDetailsController);
resumeRouter.delete("/experienceWork/:resumeId/:experienceId", deleteExperienceWorkController);
resumeRouter.delete("/education/:resumeId/:educationId", deleteEducationController);
resumeRouter.delete("/skills/:resumeId/:skillId", deleteSkillsController);
// resumeRouter.delete("/projects/:id", deleteProjectsController);

export default resumeRouter;
