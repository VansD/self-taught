import { NextFunction, Request, Response, response } from "express";
import userRepository from "../repositories/user.repository";
import { User } from "../models/user.model";
import { verifyToken } from "../middleware/authJwt";
import { ListResponse } from "../repositories/listResponse";

export default class AdminController {
    async create(req: Request, res: Response) {
        try {
            let result = userRepository.create(req.body);
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

    async getAll(req: Request, res: Response) {
        try {
            let result: User[] = await userRepository.getAll();
            res.status(200).json(result);
        } catch (err) {

            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async getAllWithCount(req: Request, res: Response, next: NextFunction) {
        try {
            let page = Number(req.query.page);
            let limit = Number(req.query.pageLimit);
            let result: ListResponse<User> = await userRepository.getAllWithCount(page, limit);
            res.status(200).json(result);

        } catch (err) {
            console.log(JSON.stringify(err));

            res.status(500).json({
                message: "Internal Server Error!",
                error: JSON.stringify(err)
            });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            let result: User | null = await userRepository.getById(userId);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            await userRepository.update(req.body);
            res.status(200).json({
                message: "User Updated"
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            await userRepository.delete(userId);
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