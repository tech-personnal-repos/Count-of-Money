import { Router } from 'express';

import post from './methods/post.js';

const router = Router();

router.use('/', post);

export default router;
