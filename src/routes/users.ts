import express from 'express';
import { deleteUser, getAllUser, postUser, updateUser } from '../controllers/users';

const router = express.Router()

//CREATE
router.post('/', postUser)
//READ
router.get('/', getAllUser)
// UPDATE
router.patch('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

export default router