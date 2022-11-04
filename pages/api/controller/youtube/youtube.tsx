import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../model/postModel";
import fs from 'fs'
import { Youtube } from "../../model/youTubeModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function YouTubex(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "GET"){
        try {
            const findpost = await Youtube.find({}).sort({createdAt:-1})
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    if(req.method === "POST"){
        const {title} = req.body.Youtube
        const {youtube_id} = req.body.Youtube
        try {
            const findpost = await Youtube.create({
                title,youtube_id
            })
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    if(req.method === "PUT"){
        const {id} = req.body
        try {
            const findpost = await Youtube.findByIdAndDelete(id)
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    
  }