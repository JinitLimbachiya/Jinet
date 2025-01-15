import bcrypt from 'bcrypt'
import cloudinary from '../lib/cloudinary.js'
import generateToken from '../lib/utils.js'
import User from '../models/user.model.js'

// AUTHENTICATION FOR SIGN UP
export const signup = async (req, res) => {
    const { username, email, password } = req.body

    try {
        if(!username || !email || !password) {
            return res.status(400).json({ message: "All field are required" })
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({email})

        if(user) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if(newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                profilePicture: newUser.profilePicture 
            })
        }
        else {
            return res.status(400).json({ message: "Invalid user data" })
        }
    }

    catch (error) {
        console.log(`Error in singup controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

// AUTHENTICATION FOR LOG IN
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({ message: "Invalid data" })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid data" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            passsword: user.password,
            profilePicture: user.profilePicture
        })
    }

    catch (error) {
        console.log(`Error in login controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

// AUTHENTICATION FOR LOG OUT
export const logout = (req, res) => {
    try{
        res.cookie("token", "")
        res.status(200).json({ message: "Logged out successfully" })
    }
    catch (error) {
        console.log(`Error in logout controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

// UPDATING PROFILE PICTURE
export const updateProfilePicture = async (req, res) => {
    const { profilePicture } = req.body
    try {
        const userID = req.user._id

        if(!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" })
        }

        const base64Length = profilePicture.length - (profilePicture.indexOf(",") + 1);
        const fileSizeInBytes = (base64Length * 3) / 4 - (profilePicture.endsWith("==") ? 2 : profilePicture.endsWith("=") ? 1 : 0);
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

        if (fileSizeInBytes > maxSizeInBytes) {
            return res.status(413).json({ message: "File size exceeds 2MB limit" });
        }
        
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await User.findByIdAndUpdate(userID,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        )

        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser })
    }

    catch (error) {
        console.log(`Error in updateProfilePicture controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error", })    
    }
}

// CHECK FOR USER AUTHENTICATION
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)    
    }
    
    catch (error) {
        console.log(`Error in checkAuth controller: ${error.message}`)
        res.status(500).json({ message: "Internal server error" })
    }
}
