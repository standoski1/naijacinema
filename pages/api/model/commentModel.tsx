import mongoose, { Document } from "mongoose";

const CommentSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
      },
    name: { 
        type: String,
        required: true
        },
    text: { 
        type: String,
        required: true
        },
    
}, {timestamps: true})

interface IComment extends Document{
    post_id: string,
    name: string,
    text: string,
}

export const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)