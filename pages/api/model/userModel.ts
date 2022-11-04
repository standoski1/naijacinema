import mongoose, { Document } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true
        },
    password: { 
        type: String,
        required: true
        },
    username: { 
        type: String,
        required: true,
        },
    
}, {timestamps: true})

interface IUser extends Document{
    email: string,
    password: string,
    username: string,
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
