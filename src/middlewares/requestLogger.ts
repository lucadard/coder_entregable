import { Request, Response, NextFunction } from 'express'
import { logger } from '../config/logger'

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.info(
    `User${req.isAuthenticated() ? '' : ' not'} authenticated request type ${
      req.method
    } to ${req.originalUrl} at ${new Date().toLocaleString()}`
  )
  next()
}
