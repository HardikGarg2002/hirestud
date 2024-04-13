import { Request, Response, NextFunction } from 'express';
import { IJob } from '../common/type/job.js';
import JobController from '../controller/job-controller.js';

const jobController = new JobController();

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // pagination = { page : 1, pageSize : 10 }
        const pagination = req.query.pagination;
        // sort = { salary : -1 }
        const sort = req.query.sort;
        // filter = { is_active : true }
        const filter = req.query.filter;
        const result = await jobController.getAll(filter,pagination,sort);
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