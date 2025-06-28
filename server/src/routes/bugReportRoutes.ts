import {Router} from 'express';
import {getAllBugReports, submitReport, resolveReport} from '../controllers/bugReportController';

const router = Router();

router.get('/', getAllBugReports);
router.post('/submit', submitReport);
router.put('/:report_id', resolveReport);


export default router;