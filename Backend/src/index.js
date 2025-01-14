import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import messageRoutes from './routes/message.route.js'
import authRoutes from './routes/auth.route.js'

import connectDB from './lib/db.js'
import { app, server } from './lib/socket.js'
import path from 'path'

dotenv.config()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)


if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })
}

server.listen(port, () => {
    console.log("Server is now live")
    connectDB()
})
