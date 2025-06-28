import {Router} from 'express';
import {getAllBugReports, submitReport} from '../controllers/bugReportController';

const router = Router();

router.get('/', getAllBugReports);
router.post('/submit', submitReport);

export default router;