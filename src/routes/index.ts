import { Router } from 'express';
import authRouter from './authentication.js';
import searchRouter from './search.js';

const router = Router();

router.post('/start-app', (req, res) => res.sendStatus(200));

router.use(authRouter);
router.use(searchRouter);

export default router;