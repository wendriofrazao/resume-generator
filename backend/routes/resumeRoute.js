import express from 'express';
import { personalController } from '../controllers/resumeController.js';

const resumeRouter = express.Router();

resumeRouter.get('/internship', (req, res) => {
    res.render('template/internship', { layout: 'templates' });
});

resumeRouter.get('/work', (req, res) => {
    res.render('template/work', { layout: 'templates' });
});

resumeRouter.get('/personal', async (req, res) => {

        res.render('works/personalCreate', {
            layout: 'templates',
            resumeId: "650f1a2b3c4d5e6f7a8b9c0d"
        });

});

resumeRouter.post('/personal', personalController);

export default resumeRouter;
