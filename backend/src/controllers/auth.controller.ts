import { Request, Response } from "express";
import { Role, User } from "../models/user.model";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { config } from "../config/auth.config";
import { Store } from "express-session";

export default class AuthController {

  async login(req: Request, res: Response) {
    try {
      User.findOne({
        where: {
          email: req.body.email
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

          const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (!passwordIsValid) {
            return res.status(401).send({
              authToken: null,
              message: "Invalid Password!"
            });
          }

          const token = jwt.sign({ id: user.id },
            config.SECRET,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });


          res.status(200).send({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            authToken: token,
            role: user.role
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      let userModel = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: Role.Student
      } as User;
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {

        if (user) {
          return res.status(500).send({ message: "User already exist!" });
        }

        User.create(userModel)
          .then(user => {
            const token = jwt.sign({ id: user.id },
              config.SECRET,
              {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
              });
            user.authToken = token;
            res.status(201).send({ user });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      })

    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "OK" });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}