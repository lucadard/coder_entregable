import { Request, Response, NextFunction } from 'express'
import { userDAO } from '../databases'

export const adminAuthorization = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() && (await userDAO.isAdmin(req.user.id)))
    return next()
  else res.status(404).send({ error: 'You do not have admin permissions' })
}
