/**
 * auth.ts
 */
import { Request, Response, NextFunction } from "express"
import { CustomJwtPayload } from "../types";
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("An access token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as CustomJwtPayload;
    req.user = decoded;
    // console.log(decoded);
    next();
  } catch (_) {
    res.status(401).send("Invalid token.");
  }
}

export default verifyToken;