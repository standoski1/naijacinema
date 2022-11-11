import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../middleware/handler';
import { uploads } from '../../middleware/uploads';
import { Post } from '../../model/postModel';
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config()
import { s3 } from '../../../../components/creadentials';



export const config = {
  api: {
    bodyParser: false,
  },
}

interface MulterRequest extends NextApiRequest {
  file: any
  headers: any
}


handler.use(uploads).post(async (req: MulterRequest, res:NextApiResponse)=>{
  const {title} = req.body
  const {text} = req.body
  const {category} = req.body
  const {id} = req.body
  const {oldimage} = req.body
  const filename = req?.file
  const image = 'https://newnodebucket.s3.eu-west-2.amazonaws.com/' + filename?.key  
  const delImage = "naijacinemas/" + oldimage?.split("/")[4]
  
  try {
    if (filename) {
        await Post.findByIdAndUpdate(id, {
            title,text,image,category
        })
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
        const findpost = await Post.find({}).sort({createdAt:-1})
        res.status(200).json(findpost)
    } else {
        await Post.findByIdAndUpdate(id, {
            title,text,category
        })
        const findpost = await Post.find({}).sort({createdAt:-1})
        res.status(200).json(findpost)
    }
  } catch (error:any) {
    res.status(401).json(error.message)
    console.log(error.message);
    
  }
})


export default handler






