/**
 * auth.ts
 */
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Receive token from request headers
   *  - If no token, return error message & disallow continued access
   * - decode token
   *  - derive user from token if still valid
   *  - throw error if token has expired and is thus invalid.
   */
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("An access token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret)
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (_) {
    res.status(401).send("Invalid token.");
  }
}

export default verifyToken;