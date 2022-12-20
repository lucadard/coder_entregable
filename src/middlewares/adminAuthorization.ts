import { Request, Response, NextFunction } from 'express'
import { usersDAO } from '../databases'
import { usersService } from '../services'

export const adminAuthorization = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() && (await usersService.isAdmin(req.user.id)))
    return next()
  else res.status(404).send({ error: 'You do not have admin permissions' })
}
