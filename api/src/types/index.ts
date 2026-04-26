import { JwtPayload } from "jsonwebtoken"

export interface CustomJwtPayload extends JwtPayload {
  user_id: string,
  email: string,
}