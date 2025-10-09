import express from 'express';
import { personalController } from '../controllers/resumeController.js';

const resumeRouter = express.Router();

resumeRouter.get('/internship', (req, res) => {
    res.render('template/internship', { layout: 'templates' });
})

resumeRouter.get('/work', (req, res) => {
    res.render('template/work', { layout: 'templates' });
})

resumeRouter.get('/personal', (req, res) => {
        res.render('works/personal');
})

resumeRouter.post('/personal', personalController);

export default resumeRouter;