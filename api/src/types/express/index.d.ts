import { CustomJwtPayload } from ".."

// declare namespace Express {
//   export interface Request {
//     user ?: CustomJwtPayload
//   }
// }

declare module 'express-serve-static-core' {
  export interface Request {
    user ?: CustomJwtPayload,
  }
}

export {} // ChatGPT insisted on this.