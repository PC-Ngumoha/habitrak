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
   * - Return a JSON implementation
   */
  try {

  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {}