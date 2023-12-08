import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const postUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
        const result = await prisma.users.create({
            data: {
                name,
                email,
                password
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

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.users.findMany()
        res.json({ message: 'Users List', data: result })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, password, is_verified } = req.body

    try {
        const result = await prisma.users.update({
            data: {
                name,
                email,
                password,
                is_verified
            },
            where: {
                id: Number(id)
            }
        })
        res.json({ message: `User ${id} updated`, data: result })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await prisma.users.delete({
            where: { id: Number(id) }
        })

        res.json({ message: `User ${id} deleted` })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        })
    }
}

export {
    getAllUser,
    postUser,
    updateUser,
    deleteUser
}