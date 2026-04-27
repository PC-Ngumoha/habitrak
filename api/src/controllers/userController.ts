/**
 * userController.ts
 */

import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcryptjs';


class UserController {
  saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
  }

  _generateToken(user: any): string {
    return jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "5h",
      }
    );
  }

  register = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const { firstName, lastName, email, password } = req.body;

      if (!(firstName && lastName && email && password)) {
        res.status(400).send("You must provide all required fields")
      }

      const existingUser = await prisma.user.findFirst({ where: { email }});

      if (existingUser) {
        return res.status(409).send("User already exists. Login instead.");
      }
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      // Save user to DB
      const user = await prisma.user.create({ data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          token: '' // Yet to create access token
        },
        omit: {
          password: true
        }
      });

      user.token = this._generateToken(user);
      // return new user
      res.status(201).json(user);

    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const {email, password} = req.body;

      if (!(email && password)) {
        res.status(400).send("You must provide all required fields");
      }

      const user = await prisma.user.findFirst({ where: { email } });

      if ( user && (await bcrypt.compare(password, user.password))) {
        user.token = this._generateToken(user);
        // Remove password
        const { password, ...safeUser} = user;

        return res.json(safeUser);
      }

      res.status(401).send("Invalid user data provided.");

    } catch (error) {
      console.error(error);
      next(error);
    }
  }

   currentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findFirst({ where: { id: req.user!.user_id }});

      // Remove password
      const { password, ...safeUser} = user!;

      res.json(safeUser);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

/**
 * BUGS:
 * - When the user logs in a second time, the previous token should be revoked
 *   if it was still acceptable.
 *    Possible fix: Reduce the lifespan of the access token.
 */
