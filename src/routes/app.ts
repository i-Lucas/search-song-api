import { Router } from 'express';
import app from '../controllers/app.js';

const appRouter = Router();

appRouter.post('/start-app', app.visits);

export default appRouter;