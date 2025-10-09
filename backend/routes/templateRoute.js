import express from 'express';
import { listTemplates, getTemplate } from '../controllers/templateController.js';

const router = express.Router();

router.get('/', listTemplates);

router.get('/:templateId', getTemplate);

export default router;