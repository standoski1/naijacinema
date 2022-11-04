import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../model/commentModel";
import { Movies } from "../../model/moviesModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function CreateComment(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "PUT"){
        const {post_id} = req.body
        try {
            const findmov = await Comment.find({post_id}).sort({createdAt:-1})
            res.status(200).json(findmov)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    if(req.method === "POST"){
        const {name} = req.body.Comment
        const {text} = req.body.Comment
        const {post_id} = req.body.Comment
        
        try {
            const findmov = await Comment.create({
                name, text, post_id
            })
            res.status(200).json(findmov)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    
  }