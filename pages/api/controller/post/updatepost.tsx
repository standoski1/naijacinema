import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../middleware/handler';
import { uploads } from '../../middleware/uploads';
import { Post } from '../../model/postModel';
import absoluteUrl from 'next-absolute-url'
import fs from 'fs'



export const config = {
  api: {
    bodyParser: false,
  },
}

interface MulterRequest extends NextApiRequest {
  file: any
  headers: any
}


handler.use(uploads.single('file')).post(async (req: MulterRequest, res:NextApiResponse)=>{
  const {title} = req.body
  const {text} = req.body
  const {category} = req.body
  const {id} = req.body
  const {oldimage} = req.body
  const newImage = req?.file?.filename
  const { origin } = absoluteUrl(req)
  const URL = `${origin}/uploads/${newImage}` 
  const delImage = "./public/uploads/" + oldimage?.split("/")[4]
  
  try {
    if (newImage) {
        await Post.findByIdAndUpdate(id, {
            title,text,image:URL,category
        })
        fs.unlinkSync(delImage)
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






