import { Router } from 'express';

import validate from '../middlewares/schema.js';
import schema from '../schemas/authentication.js';
import auth from '../controllers/authentication.js';

const authRouter = Router();

authRouter.post('/signup', validate(schema.signup), auth.signup);
authRouter.post('/signin', validate(schema.signin), auth.signin);

export default authRouter;