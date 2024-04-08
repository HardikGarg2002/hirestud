import express from 'express';
const router = express.Router();
import * as adminHandler from '../handler/student-handler.js';

router.route('/').get( adminHandler.getAll);
router.route('/').post( adminHandler.create);
router.route('/:id').get( adminHandler.getById);


export default router;
