import { NextFunction, Request, Response } from "express";
import taskRepository from "../repositories/task.repository";
import { ListResponse } from "../repositories/listResponse";
import { Task } from "../models/task.model";

export default class TeacherController {
    async createTask(req: Request, res: Response) {
        try {
            let model = req.body;
            let result = taskRepository.create(model);
            res.status(201).json({
                message: "create OK",
                result
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async getAllTasks(req: Request, res: Response) {
        try {
            let result: Task[] = await taskRepository.getAll();
            res.status(200).json(result);
        } catch (err) {

            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async getAllTasksWithCount(req: Request, res: Response, next: NextFunction) {
        try {
            let page = Number(req.query.page);
            let limit = Number(req.query.pageLimit);
            let result: ListResponse<Task> = await taskRepository.getAllWithCount(page, limit);
            res.status(200).json(result);

        } catch (err) {
            console.log(JSON.stringify(err));

            res.status(500).json({
                message: "Internal Server Error!",
                error: JSON.stringify(err)
            });
        }
    }

    async getOneTask(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            let result: Task | null = await taskRepository.getById(userId);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            await taskRepository.update(req.body);
            res.status(200).json({
                message: "User Updated"
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            await taskRepository.delete(userId);
            res.status(200).json({
                message: "delete OK",
                reqParamId: req.params.id
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}