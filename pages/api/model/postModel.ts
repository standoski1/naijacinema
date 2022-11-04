import mongoose, { Document } from "mongoose";
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug);

const PostSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
        },
    image: { 
        type: String,
        required: true
        },
    text: { 
        type: String,
        required: true,
        },
    category: { 
        type: String,
        required: true,
        },
    slug: { type: String, slug: "title", unique: true }
    
}, {timestamps: true})

interface IPost extends Document{
    title: string,
    image: string,
    text: string,
    category: string,
    slug: string,
}

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)