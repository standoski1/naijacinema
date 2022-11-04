import { NextApiRequest, NextApiResponse } from "next";
import { Cinema } from "../../model/cinemaModel";
import fs from 'fs'
import { Movies } from "../../model/moviesModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function EditPost(req: NewNextRequest, res: NextApiResponse) {
  
    if(req.method === "GET"){
        const {query} = req.query
        
      try {
          const findpost = await Cinema.find({ 
            $or: [ {name : { $regex: query, $options: 'i' }}, 
                   { state: { $regex: query, $options: 'i' } } ]
            });
          res.status(200).json(findpost)
        } catch (error:any) {
          res.status(401).json(error.message)
        }
  }

    if(req.method === "PUT"){
        const {query} = req.query
        
      try {
          const findpost = await Movies.findOne({cinema_id:query}).populate('cinema_id')
          res.status(200).json(findpost)
        } catch (error:any) {
          res.status(401).json(error.message)
        }
  }

  }