import express from 'express';
import { listTemplates, getTemplate } from '../controllers/templateController.js';

const templateRouter = express.Router();

templateRouter.get('/get-all-templates', listTemplates);

templateRouter.get('/get-template/:templateId', getTemplate);

export default templateRouter;