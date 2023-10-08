import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { startUpRouter } from './routes/startUps.js';
import jwt from 'jsonwebtoken'

const app = express() 

app.use(express.json())
app.use(cors())

app.use(userRouter) 
app.use(startUpRouter)

mongoose.connect(
    "mongodb+srv://subhadeepdhar1712:k8Apkxf4aerQosap@members.1eak9sy.mongodb.net/members?retryWrites=true&w=majority"
)

app.listen(5000, () => {
    console.log("Venturist is running on 5000")
})

//k8Apkxf4aerQosap