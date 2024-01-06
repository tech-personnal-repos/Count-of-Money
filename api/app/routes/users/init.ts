import { Router } from 'express';

import post from './methods/post.js';
import get from './methods/get.js';

const router = Router();

router.use('/', post);

router.use('/', get);

export default router;
