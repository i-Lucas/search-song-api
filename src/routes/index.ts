import { Router } from 'express';
import authRouter from './authentication.js';
import searchRouter from './search.js';
import appRouter from './app.js';

const router = Router();

router.use(appRouter);
router.use(authRouter);
router.use(searchRouter);

export default router;