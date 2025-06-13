import {loans} from '../controllers/loanControllers';
import { Router } from 'express';

const router = Router();
router.post('/new', loans);