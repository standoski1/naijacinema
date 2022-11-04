import mongoose, { Document } from "mongoose";

const CinemaSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
        },
    state: { 
        type: String,
        required: true
        },
    address: { 
        type: String,
        required: true,
        },
    image: { 
        type: String,
        required: true,
        },
    
}, {timestamps: true})

interface ICinema extends Document{
    name: string,
    state: string,
    address: string,
    image: string,
}

export const Cinema = mongoose.models.Cinema || mongoose.model<ICinema>('Cinema', CinemaSchema)