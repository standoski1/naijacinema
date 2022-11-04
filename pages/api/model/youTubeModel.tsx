import mongoose, { Document } from "mongoose";

const YoutubeSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
        },
    youtube_id: { 
        type: String,
        required: true
        }
    
}, {timestamps: true})

interface IYoutube extends Document{
    title: string,
    youtube_id: string,
}

export const Youtube = mongoose.models.Youtube || mongoose.model<IYoutube>('Youtube', YoutubeSchema)