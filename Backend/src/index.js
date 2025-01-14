import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import messageRoutes from './routes/message.route.js'
import authRoutes from './routes/auth.route.js'

import connectDB from './lib/db.js'
import { app, server } from './lib/socket.js'
import path from 'path'
<<<<<<< HEAD
=======

>>>>>>> ce7a6dd42809217bdc2f1c1347811db8a2bf2a17

dotenv.config()

const port = process.env.PORT

const _dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

<<<<<<< HEAD
if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })
}
=======
app.use(express.static(path.join(_dirname, "/Frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"))
})
>>>>>>> ce7a6dd42809217bdc2f1c1347811db8a2bf2a17

server.listen(port, () => {
    console.log("Server is now live")
    connectDB()
})
