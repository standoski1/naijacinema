import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../middleware/handler';
import { uploads } from '../../middleware/uploads';
import { Post } from '../../model/postModel';
import absoluteUrl from 'next-absolute-url'



export const config = {
  api: {
    bodyParser: false,
  },
}

interface MulterRequest extends NextApiRequest {
  file: any
  headers: any
}

handler.use(uploads.single('filez')).post(async (req: MulterRequest, res:NextApiResponse)=>{
  const {title} = req.body
  const {text} = req.body
  const {category} = req.body
  const {filename} = req.file
  const { origin } = absoluteUrl(req)
  const URL = `${origin}/uploads/${filename}` 
  
  try {
    await Post.create({
      title,text,image:URL,category
    })
    res.status(200).json('successfull')
  } catch (error:any) {
    res.status(401).json(error.message)
  }
})


export default handler






