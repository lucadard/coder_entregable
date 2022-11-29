import { Request, Response, NextFunction } from 'express'

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAuthenticated = req.isAuthenticated()
  if (isAuthenticated) return next()
  else res.status(401).redirect('/auth/login')
}
