import {ErrorRequestHandler, NextFunction, Request, Response} from 'express'
import { CustomError } from '../errors/CustomError'

export const errorMiddleware: ErrorRequestHandler = (
    error:  Error & Partial<CustomError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const errorCode = error.errorCode
    return res.status(statusCode).json({ 
        error_code: errorCode, 
        error_description: error.message
    })
}