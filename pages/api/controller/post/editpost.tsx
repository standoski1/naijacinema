import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../model/postModel";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config()
import { s3 } from "../../../../components/creadentials";



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
      const delImage = "naijacinemas/" + img?.split("/")[4]
      try {
        const dellpost = await Post.findByIdAndDelete(id)
        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: delImage
      };
        await s3.send(new DeleteObjectCommand(params), (error, data) => {
        if (error) {
          console.log(error.message);
        }
        else{
          console.log("deleted" + data);
        }
      }); 
        res.status(200).json(dellpost)
      } catch (error:any) {
        res.status(401).json(error.message)
      }
    }
  }