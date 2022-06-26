import { Response, NextFunction } from "express"
import { Request as JWTRequest } from "express-jwt"
import { User } from "../entity/User"

export const isRole = (roles: Array<string>) => {
  return async (req: JWTRequest, res: Response, next: NextFunction) => {
    const id = req.auth.id

    let user: User
    try {
      user = await User.findOneBy({ id: id })
    } catch (id) {
      res.status(401).json({ error: 'Invalid user' })
    }

    if (roles.indexOf(<string>user.role) > -1) {
      next()
    } else {
      res.status(401).json({ error: 'Invalid user' })
    }
  }
}