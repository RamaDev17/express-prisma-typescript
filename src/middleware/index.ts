import { NextFunction, Request, Response } from "express";
import { env } from "process";
import jwt from "jsonwebtoken"

const logRequest = (req:Request, res: Response, next: NextFunction) => {
    console.log('Request PATH', req.path);
    next()
}

interface UserData {
    id: string;
    name: string;
    email: string;
}
interface ValidationRequest extends Request {
    userData: UserData;
}

const accessValidation = (req:Request, res: Response, next: NextFunction) => {
    const validationReq = req as ValidationRequest
    const {authorization} = validationReq.headers

    if (!authorization) {
        return res.status(401).json({
            message: 'Token not found'
        })
    }

    const token = authorization.split(' ')[1]
    const secret = env.JWT_SECRET!

    try {
        const jwtDecode = jwt.verify(token, secret)

        if (typeof jwtDecode !== 'string') {
            validationReq.userData = jwtDecode as UserData
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    next()
}

export {
    logRequest,
    accessValidation
}