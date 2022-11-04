import { NextApiRequest, NextApiResponse } from "next";
import { Movies } from "../../model/moviesModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function GetMovies(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "GET"){
        try {
            const findmov = await Movies.find({}).sort({createdAt:-1}).populate("cinema_id")
            res.status(200).json(findmov)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    if(req.method === "POST"){
        const {id} = req.body
        try {
            const findmov = await Movies.findByIdAndDelete(id)
            res.status(200).json(findmov)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    
  }