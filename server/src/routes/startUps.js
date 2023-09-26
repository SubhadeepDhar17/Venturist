import express from 'express'
import { StartUpModel } from '../models/startUps.js'
import { UserModel } from '../models/users.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const startUp = new StartUpModel(req.body)
    try {
        await startUp.save()
        res.status(201).send(startUp)
    } catch (e) {
        res.status(404).send(e)
    }
}) 

router.get('/', async (req, res) => {
    try {
        const startUps = await StartUpModel.find({})
        res.status(200).json(startUps)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.delete('/', async (req, res) => {
     
})

export { router as startUpRouter }