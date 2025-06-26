import { Router } from 'express';
import { audit, getAuditLogs } from '../controllers/auditController';

const router = Router();

router.post('/:id', audit);
router.get('/', getAuditLogs);

export default router;