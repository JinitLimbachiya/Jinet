import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js'
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    onlineUsers: [],

    // FOR CHECKING THE USER AUTHENTICATION
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check") 
            set({ authUser: res.data })

            if(!get().socket) {
                get().connectSocket()
            }
        }
        
        catch (error) {
            console.log(`Error in checkAuth: ${error}`)
            set({ authUser: null })
        }

        finally {
            set({ isCheckingAuth: false })
        }
    },

    // FOR SIGNING UP THE NEW USER
    signUp: async (data) => {
        set({ isSigningUp: true })

        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success("Account created successfully")
            
            get().connectSocket()

            get().socket.emit("getOnlineUsers")
        }

        catch (error) {
            toast.error(error.message)    
        }

        finally {
            set({ isSigningUp: false })
        }
    },

    // FOR LOGGING IN THE AUTHENTICATED USER
    logIn: async (data) => {
        set({ isLoggingIn: true })

        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })    
            toast.success("Logged in successfully")

            get().connectSocket()
        }
        
        catch (error) {
            toast.error(error.response.data.message)
        }

        finally {
            set({ isLoggingIn: false })
        }
    },

    // FOR LOGGING OUT THE AUTHENTICATED USER
    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            get().disconnectSocket()
            set({ authUser: null, onlineUsers: [] })
            toast.success("Logged out successfully")                
        }
        
        catch (error) {
            toast.error(error.response.data)
        }
    },

    // FOR UPDATING THE PROFILE PICTURE OF AUTHENTICATED USER
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })

        try {
            const res = await axiosInstance.put('/auth/update-profile', data)    
            set({ authUser: res.data.user })
            toast.success("Profile updated successfully")
        }   
        
        catch (error) {
            toast.error(error.message)
        }

        finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()

        if(!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            },
            withCredentials: true
        })
        socket.connect()

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })   
        })

        set({ socket })
    },

    disconnectSocket: async () => {
        const { socket } = get()

        if(socket?.connected) {
            socket.disconnect()
            set({ socket: null })
        }
    }
}))