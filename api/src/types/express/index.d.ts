
import { JwtPayload } from "jsonwebtoken"

// interface CustomJwtPayload extends JwtPayload {
//   user_id: string,
//   email: string,
// }

// declare namespace Express {
//   export interface Request {
//     user ?: CustomJwtPayload
//   }
// }

declare module 'express-serve-static-core' {
  export interface Request {
    user ?: string | JwtPayload,
  }
}

export {} // ChatGPT insisted on this.