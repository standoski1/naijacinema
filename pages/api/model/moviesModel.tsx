import mongoose, { Document } from "mongoose";

const MoviesSchema = new mongoose.Schema({
    cinema_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true
      },
    date: { 
        type: String,
        required: true
        },
    movies: { 
        type: [{}],
        required: true,
        },
    
}, {timestamps: true})

interface IMovies extends Document{
    cinema_id: string,
    date: string,
    movies: string,
}

export const Movies = mongoose.models.Movies || mongoose.model<IMovies>('Movies', MoviesSchema)