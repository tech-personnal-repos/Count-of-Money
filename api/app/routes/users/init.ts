import { Router } from 'express';

import post from './methods/post.js';
import get from './methods/get.js';
import post from './methods/post.js';

const router = Router();

router.use('/', post);

router.use('/', get);
router.use('/', post);

export default router;
