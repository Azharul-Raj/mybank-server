import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect('mongodb://localhost:27017/my_bank')
        console.log(`Database connected`)
    } catch (error) {
        console.log(error)
    }
}