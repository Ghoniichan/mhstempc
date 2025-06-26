import { Router } from 'express';
import { audit } from '../controllers/auditController';

const router = Router();

router.post('/:id', audit);

export default router;