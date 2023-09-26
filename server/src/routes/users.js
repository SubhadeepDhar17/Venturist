import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/users.js';

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({ username })

        if (user) {
            return res.status(401).json({message: 'Username already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const newUser = new UserModel({username, password: hashedPassword})
        await newUser.save()

        res.json({message: 'User registration successful'})
    } catch (e) {
        res.status(500).json({message: "Err! We are having bit of a problem"})
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await UserModel.findOne({ username })

    if (!user) {
        return res.json({message: 'User does not exist'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({message: "Password is incorrect"})
    }

    const token = jwt.sign({id: user._id}, "secret")
    res.json({token, userID: user._id})
})

export {router as userRouter}