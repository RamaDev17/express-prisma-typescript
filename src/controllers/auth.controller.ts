import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "process";

const prisma = new PrismaClient()

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const result = await prisma.users.create({
            data: {
                id: uuidv4(),
                name,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({ message: 'User Creates', data: result })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        })
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    if (!user?.password) {
        return res.status(404).json({ message: "Password not set" })
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password)

    if (isPasswordValid) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name
        }

        const secret = env.JWT_SECRET!
        const expiresIn = 60 * 60 * 1

        const token = jwt.sign(payload, secret, {expiresIn: expiresIn})
        return res.json({
            message: "login success",
            data: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        })
    } else {
        return res.status(404).json({ message: "Wrong password" })
    }
}

export {
    register,
    login
}