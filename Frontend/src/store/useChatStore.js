import { create } from 'zustand'  
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js'
import { useAuthStore } from './useAuthStore.js'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
    

    // TO GET THE USERS EXISTING IN OUR WEBSITE
    getUsers: async() => {
        set({ isUsersLoading: true })

        try {
            const res = await axiosInstance.get('/messages/users')
            set({ users: res.data })
        }
        
        catch (error) { 
            toast.error(error.response.data.message)
        }

        finally {
            set({ isUsersLoading: false })
        }
    },

    // TO GET THE MESSAGES FROM 2 INDIVIDUAL USERS
    getMessages: async (userId) => {
        set({ messages: [], isMessageLoading: true })

        try {
            const res = await axiosInstance.get(`messages/${userId}`)
            set({ messages: res.data })
        }
        
        catch (error) {
            toast.error(error.response.data.message)
        }

        finally {
            set({ isMessageLoading: false })
        }
    },

    // TO SEND THE MESSAGES
    sendMessage: async (messageData) => {
        const { selectedUser, messages = [] } = get()

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        }
        
        catch (error) { 
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()

        if(!selectedUser) return

        const socket = useAuthStore.getState().socket

        if(!socket) return

        socket.off("newMessage")
        socket.on("newMessage", (newMessage) => {
            set((state) => ({ messages: [...state.messages, newMessage] }))
        })
    },  

    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        if(!socket) return
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))