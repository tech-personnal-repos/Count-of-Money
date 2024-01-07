import { Router } from 'express';

import get from './methods/get.js';
import post from './methods/post.js';

const router = Router();

router.use('/', post);

router.use('/', get);
router.use('/', post);

export default router;
