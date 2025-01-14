import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
    method: 'GET',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})  