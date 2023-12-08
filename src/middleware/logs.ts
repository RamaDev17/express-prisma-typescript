import { NextFunction, Request, Response } from "express";

const logRequest = (req:Request, res: Response, next: NextFunction) => {
    console.log('Request PATH', req.path);
    next()
}

export {
    logRequest
}