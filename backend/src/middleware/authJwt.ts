import jwt = require("jsonwebtoken");
import { config } from "../config/auth.config";
import { Role, User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.headers['authorization'] as string;
    debugger;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    debugger;
    jwt.verify(token.split(' ')[1],
        config.SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            const result = decoded as User;
            req.body.userId = result.id;
            next();
        });
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    User.findByPk(req.body.userId).then(user => {
        if (user?.role == Role.Admin) {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
}