import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true
    }
})

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    const userId = socket.handshake.query.userId
    if(userId) {
        userSocketMap[userId] = socket.id
    }

    socket.userId = userId

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)

        if(socket.userId) {
            delete userSocketMap[userId]
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export  { io, app, server }