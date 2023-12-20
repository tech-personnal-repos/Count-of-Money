import { Router } from 'express';

import get from './methods/get.js';
import put from './methods/put.js';

const router = Router();

router.use('/', get);
router.use('/', put);

export default router;