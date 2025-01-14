import mongoose from 'mongoose' 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected")
    }
    catch (error) {
        console.log(`Datbase connection error: ${error}`)
    }
}

export default connectDB