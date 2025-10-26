import express from 'express';
import { listTemplates, getTemplate, getTemplateByNameController, getTemplateForPreview } from '../controllers/templateController.js';
import { previewTemplate } from '../controllers/resumeController.js';

const templateRouter = express.Router();

templateRouter.get('/get-all-templates', listTemplates);

templateRouter.get('/get-template/:templateId', getTemplate);

templateRouter.get('/get-template-preview/:templateId', getTemplateForPreview); 

templateRouter.get('/get-template-by-name/:templateName', getTemplateByNameController);

templateRouter.post('/preview/:templateId', previewTemplate);

export default templateRouter;