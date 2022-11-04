import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../model/postModel";
import fs from 'fs'



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function EditPost(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "GET"){
        try {
            const findpost = await Post.find({}).sort({createdAt:-1})
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    
    if(req.method === "POST"){
      const {id} = req.body
      const {img} = req.body
      const delImage = "./public/uploads/" + img?.split("/")[4]
      try {
        const dellpost = await Post.findByIdAndDelete(id)
        fs.unlinkSync(delImage)
        res.status(200).json(dellpost)
      } catch (error:any) {
        res.status(401).json(error.message)
      }
    }
  }