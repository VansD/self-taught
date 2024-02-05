import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction): void => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }

        next();
    });
}