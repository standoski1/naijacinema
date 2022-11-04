import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../model/postModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function GetSingPost(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "PUT"){
      const {slug} = req.query
      
        try {
            const findpost = await Post.findOne({slug})
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }

    if(req.method === "GET"){
      const {slug} = req.query
      
        try {
            const findpost = await Post.find({title : { $regex: slug, $options: 'i' }})
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    
  }