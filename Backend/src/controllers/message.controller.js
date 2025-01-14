import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from '../lib/socket.js'

// GETTING OTHER USERS FOR SIDEBAR
export const getUsersSidebar = async (req, res) => {
    try {
        const loggedInUserID = req.user_id
        const filteredUsers = await User.find({_id: { $ne: loggedInUserID }}).select("-password")

        res.status(200).json(filteredUsers)
    }
    
    catch (error) {
        console.log(`Error in getUsersSidebar controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

// CHECKING FOR SENDER AND RECEIVER
export const getMessages = async (req, res) => {
    try {
        const {id: userToChatID} = req.params
        const senderID = req.user._id
        
        const messages = await Message.find({
            $or: [
                {sender: senderID, receiver: userToChatID},
                {sender: userToChatID, receiver: senderID}
            ]
        })
        res.status(200).json(messages)
    }
    
    catch (error) {
        console.log(`Error in getMessages controller: ${error.messages}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

// SENDING MESSAGE
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverID } = req.params
        const senderID = req.user._id

        if(!message) {
            return res.status(400).json({ message: "Message is required"})
        }

        const newMessage = new Message({
            sender: senderID,
            receiver: receiverID,
            message
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverID)

        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage)
    }
    
    catch (error) {
        console.log(`Error in sendMessage controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
}