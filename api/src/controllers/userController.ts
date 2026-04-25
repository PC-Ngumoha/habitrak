/**
 * userController.ts
 */

import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcryptjs';


export const register = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Get the user credentials (first name, last name, email and password)
   * - validate user input
   * - Check if the user already exists based on the email
   *  - If they do, fail to register because email already exists on server.
   * - hash the passwords
   * - save the user
   * - Generate a jwt token and assign to the newly created user.
   * - return a JSON of the newly created user
   */
  try {

    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      res.status(400).send("You must provide all required fields")
    }

    const existingUser = await prisma.user.findFirst({ where: { email }});

    if (existingUser) {
      return res.status(409).send("User already exists. Login instead.");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    // Create an access token & add to user.
    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "5h",
      }
    )

    user.token = token;

    // return new user
    res.status(201).json(user);

  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Get the user credentials (email and password)
   * - Validate user input
   * - Check if user exists based on the email
   *  - If they don't, fail to login and recommend registration instead.
   * - If user is genuine, verify password
   * - Generate a new access token.
   * - Remove password from returned user object for security purposes.
   * - Return a JSON implementation
   */
  try {
    const {email, password} = req.body;

    if (!(email && password)) {
      res.status(400).send("You must provide all required fields");
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if ( user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;

      // Remove password
      const { password: _, ...safeUser} = user;

      return res.json(safeUser);
    }

    res.status(401).send("Invalid user data provided.");

  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Testing route");
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {}