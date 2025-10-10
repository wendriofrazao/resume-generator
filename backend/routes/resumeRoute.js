import express from 'express';
import { checkAuth} from '../middlewares/authMiddleware.js'
import { createResume } from '../controllers/resumeController.js';

const resumeRouter = express.Router();

resumeRouter.get('/internship', (req, res) => {
    res.render('template/internship', { layout: 'templates' });
});

resumeRouter.get('/work', (req, res) => {
    res.render('template/work', { layout: 'templates' });
});


resumeRouter.post("/create-resume", checkAuth, createResume)

export default resumeRouter;
