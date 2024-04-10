import { Request, Response, NextFunction } from 'express';
import { IJob } from '../common/type/job.js';
import JobController from '../controller/job-controller.js';

const jobController = new JobController();

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await jobController.getAll();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.id;
        const result = await jobController.getById(jobId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobInput: IJob = req.body;
        const resultId = await jobController.create(jobInput);
        res.status(201).json({ message: 'Job created successfully', resultId });
    } catch (e) {
        next(e);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.id;
        const jobInput: IJob = req.body;
        const resultId = await jobController.update(jobId, jobInput);
        res.status(200).json({ message: 'Job updated successfully', resultId });
    } catch (e) {
        next(e);
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.id;
        const resultId = await jobController.delete(jobId);
        res.status(200).json({ message: 'Job deleted successfully', resultId });
    } catch (e) {
        next(e);
    }
}