import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const postUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const result = await prisma.users.create({
        data: {
            name,
            email,
            password
        }
    })

    res.json({ message: 'User Creates', data: result })
}

const getAllUser = async (req: Request, res: Response) => {
    const result = await prisma.users.findMany()
    res.json({ message: 'Users List', data: result })
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, password } = req.body

    const result = await prisma.users.update({
        data: {
            name,
            email,
            password
        },
        where: {
            id: Number(id)
        }
    })
    res.json({ message: `User ${id} updated`, data: result })
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.users.delete({
        where: { id: Number(id) }
    })

    res.json({ message: `User ${id} deleted` })
}

export {
    getAllUser,
    postUser,
    updateUser,
    deleteUser
}