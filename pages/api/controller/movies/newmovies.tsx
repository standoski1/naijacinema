import { NextApiRequest, NextApiResponse } from "next";
import { Cinema } from "../../model/cinemaModel";
import { Movies } from "../../model/moviesModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function NewMovies(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "GET"){
        try {
            const findpost = await Cinema.find({}).sort({createdAt:-1})
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    
    if(req.method === "POST"){
      const {cinema} = req.body
      const {list} = req.body
       
      try {
        const addmov = await Movies.create({
            cinema_id:cinema.cinema,
            date:cinema.date,
            movies:list
        })
        res.status(200).json(addmov)
      } catch (error:any) {
        res.status(401).json(error.message)
      }
    }

    if(req.method === "PUT"){
      const {cinema} = req.body
      const {list} = req.body
      const {id} = req.body
       
      try {
        await Movies.findByIdAndUpdate(id,{
            cinema_id:cinema.cinema,
            date:cinema.date,
            movies:list
        })
        res.status(200).json('success')
      } catch (error:any) {
        res.status(401).json(error.message)
      }
    }
  }