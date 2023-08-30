import cors from 'cors'
import env from 'dotenv'
import express, { Request, Response } from 'express'
import mongoose  from 'mongoose'
import Sportrex from './routes/sportrex'

env.config()

const app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Port = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log("Database connected"))
.catch(err => console.log(err))

app.listen(Port, () => console.log("server listening on port " + Port))

app.use('/api/v1/sportrex', Sportrex)

app.get('/', (_:Request, res: Response) => {
    res.json({
        status: "ok",
        message: "Server is running"
    })
})