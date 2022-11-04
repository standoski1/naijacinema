import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../model/postModel";



interface NewNextRequest extends NextApiRequest {
    params: any
}

export default async function GetPost(req: NewNextRequest, res: NextApiResponse) {
  

    if(req.method === "GET"){
        try {
            const findpost = await Post.find({}).sort({createdAt:-1})
            res.status(200).json(findpost)
          } catch (error:any) {
            res.status(401).json(error.message)
          }
    }
    if(req.method === "PUT"){
      console.log(req.body.query);
      
        // try {
        //     const findpost = await Post.find({}).sort({createdAt:-1})
        //     res.status(200).json(findpost)
        //   } catch (error:any) {
        //     res.status(401).json(error.message)
        //   }
    }
    
  }