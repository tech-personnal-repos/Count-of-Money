import { Router } from 'express';

import get from './methods/get.js';

const router = Router();

router.use('/', get);

export default router;
