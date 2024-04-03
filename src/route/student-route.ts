import express from 'express';
const router = express.Router();
import * as adminHandler from '../handler/student-handler.js';

router.route('/').post( adminHandler.create);



export default router;
