import express from 'express';
import * as JobHandler from '../handler/job-handler.js';

const router = express.Router();

router.get('/', JobHandler.getAll);
router.get('/:id', JobHandler.getById);
router.post('/', JobHandler.create);
router.put('/:id', JobHandler.update);
router.delete('/:id', JobHandler.deleteById);

export default router;
